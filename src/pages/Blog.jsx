import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import "./Blog.css";

const POSTS = [
  { id:1, tag:"Learning Science", title:"Why doing beats watching every time", excerpt:"Passive video content feels productive but leaves almost nothing behind. Here's the science on why active problem solving changes everything.", date:"May 2, 2025", readTime:"5 min read", emoji:"🧠" },
  { id:2, tag:"Mathematics", title:"The beautiful geometry hiding in your coffee cup", excerpt:"From the spiral of cream to the ripples in the surface — calculus and geometry are literally everywhere once you know how to look.", date:"Apr 28, 2025", readTime:"7 min read", emoji:"☕" },
  { id:3, tag:"Computer Science", title:"What is recursion, really?", excerpt:"Most explanations of recursion are themselves confusing. Here's a genuinely intuitive approach that finally makes it click.", date:"Apr 22, 2025", readTime:"6 min read", emoji:"🔄" },
  { id:4, tag:"Career", title:"How learning to code changed my life (no clichés)", excerpt:"A real account from a Brilliant learner who went from complete beginner to landing a software engineering job in 14 months.", date:"Apr 15, 2025", readTime:"9 min read", emoji:"💼" },
  { id:5, tag:"Logic", title:"The prisoner's dilemma and why it's everywhere", excerpt:"Game theory isn't just for economists. From geopolitics to split restaurant bills, this classic problem explains more than you'd think.", date:"Apr 10, 2025", readTime:"8 min read", emoji:"🎮" },
  { id:6, tag:"Learning Science", title:"Building a 100-day learning streak: what we learned", excerpt:"We analyzed streak data from 1 million Brilliant users. Here's what the top learners have in common.", date:"Apr 4, 2025", readTime:"4 min read", emoji:"🔥" },
];

const TAGS = ["All", "Learning Science", "Mathematics", "Computer Science", "Career", "Logic"];

const Blog = () => (
  <div className="blog-page">
    {/* HERO */}
    <section className="blog-hero">
      <div className="bh-inner">
        <div className="section-label">Blog</div>
        <h1>Ideas worth thinking about</h1>
        <p>Essays, explainers, and stories about learning, math, science, and technology.</p>
      </div>
    </section>

    {/* TAG FILTER */}
    <div className="blog-tags-bar">
      <div className="btb-inner">
        {TAGS.map(t => (
          <button key={t} className={`blog-tag-btn ${t === "All" ? "active" : ""}`}>{t}</button>
        ))}
      </div>
    </div>

    {/* POSTS */}
    <section className="blog-posts">
      <div className="bp-inner">
        {/* Featured */}
        <div className="featured-post">
          <div className="fp-emoji">{POSTS[0].emoji}</div>
          <div className="fp-body">
            <span className="post-tag">{POSTS[0].tag}</span>
            <h2>{POSTS[0].title}</h2>
            <p>{POSTS[0].excerpt}</p>
            <div className="post-meta">
              <span><Clock size={13}/> {POSTS[0].readTime}</span>
              <span>{POSTS[0].date}</span>
            </div>
            <a href="#" className="post-link">Read more <ArrowRight size={14}/></a>
          </div>
        </div>

        {/* Grid */}
        <div className="posts-grid">
          {POSTS.slice(1).map(post => (
            <div key={post.id} className="post-card">
              <div className="pc-emoji">{post.emoji}</div>
              <div className="pc-body">
                <span className="post-tag">{post.tag}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="post-meta">
                  <span><Clock size={12}/> {post.readTime}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* NEWSLETTER */}
    <section className="blog-newsletter">
      <div className="bn-inner">
        <h2>Get new essays in your inbox</h2>
        <p>Join 50,000+ curious people who get our weekly digest.</p>
        <div className="bn-form">
          <input type="email" placeholder="your@email.com" className="bn-input"/>
          <button className="btn-primary">Subscribe <ArrowRight size={15}/></button>
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
