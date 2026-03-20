import React from 'react';

type MobileHamburgerButtonProps = {
  isMenuOpen: boolean;
  onToggle: () => void;
  ariaControls?: string;
};

const MobileHamburgerButton: React.FC<MobileHamburgerButtonProps> = ({
  isMenuOpen,
  onToggle,
  ariaControls = 'mobile-nav',
}) => {
  return (
    <button
      className="menu-toggle"
      type="button"
      onClick={onToggle}
      aria-label={isMenuOpen ? 'Đóng menu di động' : 'Mở menu di động'}
      aria-expanded={isMenuOpen}
      aria-controls={ariaControls}
      aria-haspopup="true"
    >
      <span className={`hamburger ${isMenuOpen ? 'active' : ''}`} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </button>
  );
};

export default MobileHamburgerButton;

