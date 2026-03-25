type SocialLinksProps = {
  linkedinUrl?: string;
  githubUrl?: string;
  leetcodeUrl?: string;
  email?: string;
};

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-7 w-7 fill-current"
    >
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.66 4.8 6.11V21h-4v-5.54c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.93V21h-4V9Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-7 w-7 fill-current"
    >
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.08 1.85 2.82 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.48-1.34-5.48-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.31 1.23A11.5 11.5 0 0 1 12 6.32c1.02 0 2.05.14 3.01.41 2.3-1.55 3.31-1.23 3.31-1.23.66 1.65.25 2.88.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.95.44.38.82 1.12.82 2.26v3.35c0 .32.22.69.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-7 w-7 fill-current"
    >
      <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v.22L12 12 3 5.22V5Zm0 2.72V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.72l-8.4 6.22a1 1 0 0 1-1.2 0L3 7.72Z" />
    </svg>
  );
}

function LeetCodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-7 w-7 fill-current"
    >
      <path d="M14.6 2.5a1 1 0 0 1 1.42 0l5.48 5.48a1 1 0 1 1-1.42 1.42l-5.48-5.48a1 1 0 0 1 0-1.42Z" />
      <path d="M11.98 3.6a1 1 0 0 1 0 1.42L7.1 9.9a3 3 0 0 0 0 4.24l4.88 4.88a1 1 0 1 1-1.42 1.42l-4.88-4.88a5 5 0 0 1 0-7.07l4.88-4.88a1 1 0 0 1 1.42 0Z" />
      <path d="M9.5 12a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2h-10a1 1 0 0 1-1-1Z" />
    </svg>
  );
}

export default function SocialLinks({
  linkedinUrl,
  githubUrl,
  leetcodeUrl,
  email,
}: SocialLinksProps) {
  const links = [
    linkedinUrl
      ? {
          href: linkedinUrl,
          label: "LinkedIn",
          icon: <LinkedInIcon />,
        }
      : null,
    githubUrl
      ? {
          href: githubUrl,
          label: "GitHub",
          icon: <GitHubIcon />,
        }
      : null,
    leetcodeUrl
      ? {
          href: leetcodeUrl,
          label: "LeetCode",
          icon: <LeetCodeIcon />,
        }
      : null,
    email
      ? {
          href: `mailto:${email}`,
          label: "Email",
          icon: <MailIcon />,
        }
      : null,
  ].filter(Boolean) as Array<{
    href: string;
    label: string;
    icon: JSX.Element;
  }>;

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 mt-3 flex items-center gap-5 text-sky-400">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          title={link.label}
          className="transition-colors hover:text-sky-300"
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
