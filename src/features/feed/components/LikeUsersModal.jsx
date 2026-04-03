export default function LikeUsersModal({ open, title, users, onClose }) {
  if (!open) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,.45)" }}
      tabIndex="-1"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            {users?.length ? (
              <ul className="list-unstyled mb-0">
                {users.map((user) => (
                  <li key={user.id} className="py-2 border-bottom">
                    {user.firstName} {user.lastName}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted">No users yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
