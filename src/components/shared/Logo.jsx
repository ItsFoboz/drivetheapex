/**
 * Logo — DriveTheApex brand mark component.
 *
 * Props:
 *   variant   {'full'|'mark'}  — 'full' renders the full wordmark lockup (default),
 *                                'mark' renders the standalone logomark icon.
 *   height    {number}         — Rendered height in px; width scales proportionally. Default 32.
 *   className {string}         — Additional CSS classes forwarded to the <img> element.
 */
export default function Logo({ variant = 'full', height = 32, className = '' }) {
  if (variant === 'mark') {
    return (
      <img
        src="/drivetheapexlogomark.svg"
        alt="DTA"
        style={{ height }}
        className={className}
      />
    );
  }

  return (
    <img
      src="/drivetheapexlogo.svg"
      alt="DriveTheApex"
      style={{ height }}
      className={className}
    />
  );
}
