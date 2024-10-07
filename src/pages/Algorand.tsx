import { useEffect, useState } from 'react';

const AlgorandPage = ({ accountData, assetData, blockData, applicationData }: any) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [accountInfo, setAccountInfo] = useState<any | null>(accountData || null);
  const [assetInfo, setAssetInfo] = useState<any | null>(assetData || null);
  const [blockInfo, setBlockInfo] = useState<any | null>(blockData || null);
  const [applicationInfo, setApplicationInfo] = useState<any | null>(applicationData || null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlgorandData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate fetching real data using LLM function calls if no initial data is provided
        if (!accountData) {
          const accountDataFetched = await getAccountInformation({ address: params.address });
          setAccountInfo(accountDataFetched);
        }

        if (!assetData) {
          const assetDataFetched = await getAssetInformation({ assetId: params.assetId });
          setAssetInfo(assetDataFetched);
        }

        if (!blockData) {
          const blockDataFetched = await getBlockInformation({ roundNumber: params.roundNumber });
          setBlockInfo(blockDataFetched);
        }

        if (!applicationData) {
          const applicationDataFetched = await getApplicationInformation({ appId: params.appId });
          setApplicationInfo(applicationDataFetched);
        }

        // Transactions are always fetched dynamically
        const transactionsData = await searchTransactions({ limit: params.limit });
        setTransactions(transactionsData);
      } catch (err) {
        console.error('Error fetching Algorand data:', err);
        setError('Error fetching Algorand data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlgorandData();
  }, [accountData, assetData, blockData, applicationData]);

  return (
    <div>
      <h2>Algorand Data</h2>
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h3>Transactions</h3>
        {transactions.length > 0 ? (
          <ul>
            {transactions.map((transaction: any, index: number) => (
              <li key={index}>{JSON.stringify(transaction)}</li>
            ))}
          </ul>
        ) : (
          !loading && <p>No transactions found.</p>
        )}
      </div>

      <div>
        <h3>Account Information</h3>
        {accountInfo ? (
          <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
        ) : (
          !loading && <p>No account information found.</p>
        )}
      </div>

      <div>
        <h3>Asset Information</h3>
        {assetInfo ? (
          <pre>{JSON.stringify(assetInfo, null, 2)}</pre>
        ) : (
          !loading && <p>No asset information found.</p>
        )}
      </div>

      <div>
        <h3>Block Information</h3>
        {blockInfo ? (
          <pre>{JSON.stringify(blockInfo, null, 2)}</pre>
        ) : (
          !loading && <p>No block information found.</p>
        )}
      </div>

      <div>
        <h3>Application Information</h3>
        {applicationInfo ? (
          <pre>{JSON.stringify(applicationInfo, null, 2)}</pre>
        ) : (
          !loading && <p>No application information found.</p>
        )}
      </div>
    </div>
  );
};

export default AlgorandPage;