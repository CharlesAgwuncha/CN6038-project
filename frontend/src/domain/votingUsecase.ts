import walletUsecase from './walletUsecase.ts';
import useAppStore from './store.ts';
import { toast } from 'react-toastify';

interface VotingUsecase {
  getVoteStatus: () => Promise<void>;
  getResultStatus: () => Promise<void>;
  getRole: () => Promise<void>;
  startVoting: () => Promise<void>;
  endVoting: () => Promise<void>;
  reset: () => Promise<void>;
}

const votingUsecase: VotingUsecase = {
  getVoteStatus: async () => {
    try {
      const contract = await walletUsecase.getContract();
      if (!contract) {
        return;
      }

      const store = await useAppStore.getState();
      // get initial state
      // @ts-ignore
      await contract.getVoteStatus().then(store.setVoteStatus);

      await contract.on('VoteStatusChanged', store.setVoteStatus);
    } catch (error) {
      console.error('Error getting vote status:', error);
      toast(error.message ?? 'Error getting vote status', { type: 'error' });
    }
  },
  getResultStatus: async () => {
    try {
      const contract = await walletUsecase.getContract();
      if (!contract) {
        return;
      }

      const store = await useAppStore.getState();
      // get initial state
      // @ts-ignore
      await contract.getResultStatus().then(store.setResultStatus);

      await contract.on('ResultStatusChanged', store.setResultStatus);
    } catch (error) {
      console.error('Error getting result status:', error);
      toast(error.message ?? 'Error getting result status', { type: 'error' });
    }
  },
  getRole: async () => {
    try {
      const contract = await walletUsecase.getContract();
      if (!contract) {
        return;
      }

      const store = await useAppStore.getState();
      // get initial state
      // @ts-ignore
      await contract.getRole(store.wallet).then(store.setRole);
    } catch (error) {
      console.error('Error getting role:', error);
      toast(error.message ?? 'Error getting role', { type: 'error' });
    }
  },
  startVoting: async () => {
    try {
      const contract = await walletUsecase.getContract(true);
      if (!contract) {
        return;
      }

      // @ts-ignore
      await contract.startVoting();
    } catch (error) {
      console.error('Error starting voting:', error);
      toast(error.message ?? 'Error starting voting', { type: 'error' });
    }
  },
  endVoting: async () => {
    try {
      const contract = await walletUsecase.getContract(true);
      if (!contract) {
        return;
      }

      // @ts-ignore
      await contract.endVoting();
    } catch (error) {
      console.error('Error ending voting:', error);
      toast(error.message ?? 'Error ending voting', { type: 'error' });
    }
  },
  reset: async () => {
    try {
      const contract = await walletUsecase.getContract(true);
      if (!contract) {
        return;
      }

      // @ts-ignore
      await contract.reset();
    } catch (error) {
      console.error('Error resetting voting:', error);
      toast(error.message ?? 'Error resetting voting', { type: 'error' });
    }
  }

};

export default votingUsecase;