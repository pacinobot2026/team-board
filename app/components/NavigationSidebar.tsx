'use client';

import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'command-center', label: 'Command Center', icon: '⚡', href: 'https://dashboard-gilt-one-zc4y5uu95v.vercel.app' },
  { id: 'custom-commands', label: 'Custom Commands', icon: '⌘', href: 'https://dashboard-gilt-one-zc4y5uu95v.vercel.app/commands' },
  { id: 'team', label: 'Team Board', icon: '◉', href: 'https://kanban-rho-ivory.vercel.app' },
  { id: 'projects', label: 'Project Board', icon: '▦', href: 'https://kanban-rho-ivory.vercel.app' },
  { id: 'articles', label: 'Article Board', icon: '□', href: 'https://vizard-clips-app.vercel.app/articles' },
  { id: 'video', label: 'Video Cue System', icon: '▶', href: 'https://vizard-clips-app.vercel.app/dashboard' },
  { id: 'ideas', label: 'Idea Board', icon: '◈', href: 'https://vizard-clips-app.vercel.app/ideas' },
  { id: 'wishlist', label: 'Wish List', icon: '☆', href: '#' },
  { id: 'resources', label: 'Resource Library', icon: '⊞', href: '#' },
  { id: 'bookmarks', label: 'Bookmark Manager', icon: '⊡', href: 'https://vizard-clips-app.vercel.app/bookmarks' },
];

export default function NavigationSidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div 
      style={{ 
        width: '56px',
        minHeight: '100vh', 
        background: '#0a0a0a', 
        borderRight: '1px solid #1f2937',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Logo */}
      <div style={{
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #1f2937'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>P</span>
        </div>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, paddingTop: '8px', paddingBottom: '8px' }}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '48px',
              color: item.id === 'team' ? '#c084fc' : '#6b7280',
              textDecoration: 'none',
              transition: 'all 0.2s',
              background: item.id === 'team' ? '#111827' : 'transparent',
              fontSize: '18px',
              fontWeight: '300'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#111827';
              e.currentTarget.style.color = '#fff';
              setHoveredItem(item.id);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = item.id === 'team' ? '#111827' : 'transparent';
              e.currentTarget.style.color = item.id === 'team' ? '#c084fc' : '#6b7280';
              setHoveredItem(null);
            }}
          >
            {/* Icon */}
            <span>{item.icon}</span>
            
            {/* Tooltip */}
            {hoveredItem === item.id && (
              <div style={{
                position: 'absolute',
                left: '100%',
                marginLeft: '8px',
                padding: '6px 12px',
                background: '#111827',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '500',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                zIndex: 50,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                border: '1px solid #374151'
              }}>
                {item.label}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translate(-5px, -50%)',
                  width: 0,
                  height: 0,
                  borderTop: '5px solid transparent',
                  borderBottom: '5px solid transparent',
                  borderRight: '5px solid #111827'
                }} />
              </div>
            )}
          </a>
        ))}
      </nav>
    </div>
  );
}
