import { useGetClientsQuery } from "../../redux/featurs/client/clientApi";


const Client = () => {
  const { data: response, isLoading, isError, error } = useGetClientsQuery();

  if (isLoading) {
    return <div className="client-loading">Loading clients...</div>;
  }

  if (isError) {
    console.error("Client API Error:", error);
    return <div className="client-error">Failed to load client logos.</div>;
  }

  // API response থেকে data বের করা
  const clients = response?.data || [];

  // ডাটাবেজের isActive: true ফিল্টার করা
  const activeClients = clients.filter((client) => client.isActive !== false);

  return (
    <section className="client-section">
      <div className="client-container">
        
        {/* Header */}
        <div className="client-header">
          <div className="client-badge">
            <span className="bracket-left"></span>
            <span className="badge-text">My Awesome Clients</span>
            <span className="bracket-right"></span>
          </div>
          <h2 className="client-title">My Awesome Clients</h2>
        </div>

        {/* Brand Logos Grid */}
        {activeClients.length === 0 ? (
          <div className="client-empty">No clients found.</div>
        ) : (
          <div className="client-grid">
            {activeClients.map((client) => {
              const clientId = client.id || client._id;

              return (
                <a
                  key={clientId}
                  href={client.website || "#"}
                  target={client.website ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="client-card"
                >
                  {/* লোগো ইমেজ */}
                  <img
                    src={client.logo}
                    alt={client.name || "Client Logo"}
                    className="client-logo"
                    loading="lazy"
                  />
                  
                  {/* ক্লায়েন্টের নাম দেখানোর জন্য (লোগোর নিচে) */}
                  {client.name && (
                    <span className="client-name">{client.name}</span>
                  )}
                </a>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default Client;