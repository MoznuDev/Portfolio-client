import { useGetClientsQuery } from "../../redux/features/clients/clientApi";

const Client = () => {
  const { data: response, isLoading, isError, error } = useGetClientsQuery();

  if (isLoading) {
    return (
      <div className="client-loading text-center py-12 text-cyan-400">
        Loading clients...
      </div>
    );
  }

  if (isError) {
    console.error("Client API Error:", error);
    return (
      <div className="client-error text-center py-12 text-red-500">
        Failed to load client logos.
      </div>
    );
  }

  // Safe Data Extraction (Direct Array, clients property, or data property)
  const rawClients = Array.isArray(response)
    ? response
    : response?.clients || response?.data || [];

  // Active Clients Filter
  const activeClients = rawClients.filter(
    (client) => client.isActive !== false,
  );

  return (
    <section className="client-section" id="client">
      <div className="client-container">
        {/* Header */}
        <div className="client-header">
          <div className="client-badge">
            <span className="bracket-left">[</span>
            <span className="badge-text">My Awesome Clients</span>
            <span className="bracket-right">]</span>
          </div>
          <h2 className="client-title">My Awesome Clients</h2>
        </div>

        {/* Brand Logos Grid */}
        {activeClients.length === 0 ? (
          <div className="client-empty text-gray-400 text-center py-8">
            No clients found.
          </div>
        ) : (
          <div className="client-grid">
            {activeClients.map((client) => {
              const clientId = client._id || client.id;

              return (
                <a
                  key={clientId}
                  href={client.website || "#"}
                  target={client.website ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="client-card"
                >
                  {/* Client Logo */}
                  <img
                    src={
                      client.logo ||
                      client.image ||
                      "https://via.placeholder.com/150?text=Client+Logo"
                    }
                    alt={client.name || "Client Logo"}
                    className="client-logo"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/150?text=Client+Logo";
                    }}
                  />

                  {/* Client Name */}
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
