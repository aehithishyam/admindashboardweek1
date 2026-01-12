interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          ☰
        </button>
        <h1 className="header-title">{title}</h1>
      </div>
      <div className="header-user">
        <span>User Profile</span>
        <div className="header-avatar">A</div>
      </div>
    </header>
  );
}

export default Header;
