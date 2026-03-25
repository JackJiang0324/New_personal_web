import { BlogPosts } from "app/components/posts";
import GitHubHeatmap from "app/components/github-heatmap";
import LeetCodeHeatmap from "app/components/leetcode-heatmap";
import WorkExperience from "app/components/work-experience";
import SocialLinks from "app/components/social-links";
import Projects from "app/components/projects";

export default function Page() {
  const githubUsername = process.env.GITHUB_USERNAME;
  const leetcodeUsername = process.env.LEETCODE_USERNAME;
  const linkedinUrl = process.env.LINKEDIN_URL;
  const githubUrl =
    process.env.PERSONAL_GITHUB_URL ||
    (githubUsername ? `https://github.com/${githubUsername}` : undefined);
  const leetcodeUrl =
    process.env.PERSONAL_LEETCODE_URL ||
    (leetcodeUsername
      ? `https://leetcode.com/${leetcodeUsername}/`
      : undefined);
  const email = process.env.CONTACT_EMAIL;

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Jack Jiang
      </h1>
      <SocialLinks
        linkedinUrl={linkedinUrl}
        githubUrl={githubUrl}
        leetcodeUrl={leetcodeUrl}
        email={email}
      />
      <p className="mb-4">
        {`I am a third-year Computer Science student at the University of Waterloo, specializing in AI. I build practical software systems that solve real business problems, with experience in LLM applications, backend engineering, and data infrastructure. I am currently focused on designing scalable, high-concurrency backend systems for AI-powered products.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
      <WorkExperience />
      <Projects />
      <GitHubHeatmap username={githubUsername} />
      <LeetCodeHeatmap username={leetcodeUsername} />
    </section>
  );
}
