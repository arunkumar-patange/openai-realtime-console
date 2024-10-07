export const searchTransactions = async (params: { address?: string; assetId?: number; limit?: number; minRound?: number; maxRound?: number }) => {
  const { address, assetId, limit, minRound, maxRound } = params;
  try {
    const queryParams = new URLSearchParams();

    if (address) queryParams.append('address', address);
    if (assetId) queryParams.append('asset-id', assetId.toString());
    if (limit) queryParams.append('limit', limit.toString());
    if (minRound) queryParams.append('min-round', minRound.toString());
    if (maxRound) queryParams.append('max-round', maxRound.toString());

    const response = await fetch(`http://149.28.93.109:4190/v2/transactions?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Algo-API-Token': process.env.REACT_APP_ALGO_API_TOKEN || ''
      },
    });

    const data = await response.json();

    // Check if the response contains transactions
    if (data && data.transactions) {
      return data.transactions; // Return the transactions
    } else {
      console.error('No transactions found in the response');
      throw new Error('No transactions found'); // Throw an error if no transactions are found
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transactions'); // Throw an error on fetch failure
  }
};

export const getAccountInformation = async (params: { address: string }) => {
  const { address } = params;
  try {
    const response = await fetch(`http://149.28.93.109:4190/v2/accounts/${address}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Algo-API-Token': process.env.REACT_APP_ALGO_API_TOKEN || ''
      },
    });

    const data = await response.json();

    if (data) {
      return data; // Return the account information
    } else {
      console.error('No account information found in the response');
      throw new Error('No account information found');
    }
  } catch (error) {
    console.error('Error fetching account information:', error);
    throw new Error('Failed to fetch account information');
  }
};

export const getAssetInformation = async (params: { assetId: number }) => {
  const { assetId } = params;
  try {
    const response = await fetch(`http://149.28.93.109:4190/v2/assets/${assetId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Algo-API-Token': process.env.REACT_APP_ALGO_API_TOKEN || ''
      },
    });

    const data = await response.json();

    if (data) {
      return data; // Return the asset information
    } else {
      console.error('No asset information found in the response');
      throw new Error('No asset information found');
    }
  } catch (error) {
    console.error('Error fetching asset information:', error);
    throw new Error('Failed to fetch asset information');
  }
};

export const getBlockInformation = async (params: { roundNumber: number }) => {
  const { roundNumber } = params;
  try {
    const response = await fetch(`http://149.28.93.109:4190/v2/blocks/${roundNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Algo-API-Token': process.env.REACT_APP_ALGO_API_TOKEN || ''
      },
    });

    const data = await response.json();

    if (data) {
      return data; // Return the block information
    } else {
      console.error('No block information found in the response');
      throw new Error('No block information found');
    }
  } catch (error) {
    console.error('Error fetching block information:', error);
    throw new Error('Failed to fetch block information');
  }
};

export const getApplicationInformation = async (params: { appId: number }) => {
  const { appId } = params;
  try {
    const response = await fetch(`http://149.28.93.109:4190/v2/applications/${appId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Algo-API-Token': process.env.REACT_APP_ALGO_API_TOKEN || ''
      },
    });

    const data = await response.json();

    if (data) {
      return data; // Return the application information
    } else {
      console.error('No application information found in the response');
      throw new Error('No application information found');
    }
  } catch (error) {
    console.error('Error fetching application information:', error);
    throw new Error('Failed to fetch application information');
  }
};

// Tool metadata for searchTransactions
export const searchTransactionsTool = {
  name: 'search_transactions',
  description: 'Search for Algorand blockchain transactions based on parameters like address, asset ID, round range, and limit.',
  parameters: {
    type: 'object',
    properties: {
      address: {
        type: 'string',
        description: 'The address to filter transactions for.',
      },
      assetId: {
        type: 'number',
        description: 'The asset ID to filter transactions by.',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of transactions to return.',
      },
      minRound: {
        type: 'number',
        description: 'Include results for rounds at or after this round number.',
      },
      maxRound: {
        type: 'number',
        description: 'Include results for rounds at or before this round number.',
      },
    },
    required: [],
  },
};

// Tool metadata for getAccountInformation
export const getAccountInformationTool = {
  name: 'get_account_information',
  description: 'Get information about an Algorand account by address.',
  parameters: {
    type: 'object',
    properties: {
      address: {
        type: 'string',
        description: 'The address of the account to retrieve information for.',
      },
    },
    required: ['address'],
  },
};

// Tool metadata for getAssetInformation
export const getAssetInformationTool = {
  name: 'get_asset_information',
  description: 'Get information about an Algorand asset by asset ID.',
  parameters: {
    type: 'object',
    properties: {
      assetId: {
        type: 'number',
        description: 'The asset ID to retrieve information for.',
      },
    },
    required: ['assetId'],
  },
};

// Tool metadata for getBlockInformation
export const getBlockInformationTool = {
  name: 'get_block_information',
  description: 'Get information about an Algorand blockchain block by round number.',
  parameters: {
    type: 'object',
    properties: {
      roundNumber: {
        type: 'number',
        description: 'The round number to retrieve block information for.',
      },
    },
    required: ['roundNumber'],
  },
};

// Tool metadata for getApplicationInformation
export const getApplicationInformationTool = {
  name: 'get_application_information',
  description: 'Get information about an Algorand smart contract application by application ID.',
  parameters: {
    type: 'object',
    properties: {
      appId: {
        type: 'number',
        description: 'The application ID to retrieve information for.',
      },
    },
    required: ['appId'],
  },
};