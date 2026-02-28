'use client';

import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'command-center', label: 'OpenClaw Command Center', icon: '🎛️', href: 'https://dashboard-gilt-one-zc4y5uu95v.vercel.app' },
  { id: 'custom-commands', label: 'Custom Command Engine', icon: '⚙️', href: '#' },
  { id: 'team', label: 'Team Board', icon: '👥', href: 'https://kanban-rho-ivory.vercel.app' },
  { id: 'projects', label: 'Project Board', icon: '📋', href: 'https://kanban-rho-ivory.vercel.app' },
  { id: 'articles', label: 'Article Board', icon: '📰', href: 'https://vizard-clips-app.vercel.app/articles' },
  { id: 'video', label: 'Video Cue System', icon: '🎬', href: 'https://vizard-clips-app.vercel.app/dashboard' },
  { id: 'ideas', label: 'Idea Board', icon: '💡', href: 'https://vizard-clips-app.vercel.app/ideas' },
  { id: 'wishlist', label: 'Wish List', icon: '⭐', href: '#' },
  { id: 'resources', label: 'Resource Library', icon: '📚', href: '#' },
  { id: 'bookmarks', label: 'Bookmark Manager', icon: '🔖', href: 'https://vizard-clips-app.vercel.app/bookmarks' },
];

export default function NavigationSidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div 
      style={{ 
        width: '64px',
        minHeight: '100vh', 
        background: '#0a0a0a', 
        borderRight: '1px solid #1f2937',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Logo/Top */}
      <div style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #1f2937'
      }}>
        <span style={{ fontSize: '28px' }}>🎬</span>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, paddingTop: '16px', paddingBottom: '16px' }}>
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
              height: '56px',
              color: item.id === 'team' ? '#fff' : '#9ca3af',
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
              background: item.id === 'team' ? 'rgba(139, 92, 246, 0.3)' : 'transparent',
              borderRight: item.id === 'team' ? '2px solid #8b5cf6' : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1f2937';
              e.currentTarget.style.color = '#fff';
              setHoveredItem(item.id);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = item.id === 'team' ? 'rgba(139, 92, 246, 0.3)' : 'transparent';
              e.currentTarget.style.color = item.id === 'team' ? '#fff' : '#9ca3af';
              setHoveredItem(null);
            }}
          >
            {/* Icon */}
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            
            {/* Tooltip */}
            {hoveredItem === item.id && (
              <div style={{
                position: 'absolute',
                left: '100%',
                marginLeft: '8px',
                padding: '8px 12px',
                background: '#1f2937',
                color: '#fff',
                fontSize: '14px',
                borderRadius: '8px',
                whiteSpace: 'nowrap',
                zIndex: 50,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                border: '1px solid #374151'
              }}>
                {item.label}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translate(-4px, -50%)',
                  width: 0,
                  height: 0,
                  borderTop: '4px solid transparent',
                  borderBottom: '4px solid transparent',
                  borderRight: '4px solid #1f2937'
                }} />
              </div>
            )}
          </a>
        ))}
      </nav>
    </div>
  );
}
