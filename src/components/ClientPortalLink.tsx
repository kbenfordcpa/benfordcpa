import { siteConfig } from "@/lib/site";

type ClientPortalLinkProps = {
  className?: string;
  onClick?: () => void;
};

export function ClientPortalLink({ className, onClick }: ClientPortalLinkProps) {
  return (
    <a
      href={siteConfig.clientPortal.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      {siteConfig.clientPortal.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
