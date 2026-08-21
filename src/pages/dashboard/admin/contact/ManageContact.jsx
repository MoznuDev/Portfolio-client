import { RiDeleteBin6Line, RiMailLine, RiUser3Line } from "react-icons/ri";
import {
  useDeleteContactMessageMutation,
  useGetAllContactMessagesQuery,
} from "../../../../redux/features/auth/contacts/contactApi";

const ManageContact = () => {
  // RTK Query ব্যবহার করে ডাটা ও লোডিং স্ট্যাটাস ফেচ করা
  const {
    data: contactData,
    isLoading,
    isError,
  } = useGetAllContactMessagesQuery();
  const [deleteContactMessage] = useDeleteContactMessageMutation();

  // ব্যাকএন্ডের রেসপন্স ফরম্যাট অনুযায়ী ডাটা এক্সট্র্যাক্ট করা
  const contacts = contactData?.data || contactData || [];

  // কন্টাক্ট ডিলিট হ্যান্ডলার
  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this contact message?")
    )
      return;

    try {
      const res = await deleteContactMessage(id).unwrap();
      if (res?.success) {
        alert("Message deleted successfully!");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert(
        "Failed to delete: " + (error?.data?.message || "Something went wrong"),
      );
    }
  };

  if (isLoading) {
    return <div className="loading-text">Loading Contact Messages...</div>;
  }

  if (isError) {
    return (
      <div className="error-text">
        Failed to load messages. Check server connection.
      </div>
    );
  }

  return (
    <div className="manage-container">
      <h2>Manage Contact Messages</h2>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Sender</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date & Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data-cell">
                  No messages found.
                </td>
              </tr>
            ) : (
              contacts.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="sender-info">
                      <strong className="sender-name">
                        <RiUser3Line /> {item.name}
                      </strong>
                      <a href={`mailto:${item.email}`} className="sender-email">
                        <RiMailLine /> {item.email}
                      </a>
                    </div>
                  </td>
                  <td>
                    <span className="subject-badge">
                      {item.subject || "No Subject"}
                    </span>
                  </td>
                  <td>
                    <p className="message-content">{item.message}</p>
                  </td>
                  <td>
                    <small className="date-text">
                      {new Date(
                        item.createdAt || Date.now(),
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </small>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="delete-btn"
                      title="Delete Message"
                    >
                      <RiDeleteBin6Line /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContact;
