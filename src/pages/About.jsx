import { Link } from "react-router-dom";
import { ArrowRight, Heart, Globe, Lightbulb, Target } from "lucide-react";
import "./About.css";

const TEAM = [
  { name: "Sue Khim", role: "Co-Founder & CEO", initial: "S" },
  { name: "Alex Cooney", role: "Co-Founder & CTO", initial: "A" },
  { name: "Bret Victor", role: "Chief Design Officer", initial: "B" },
  { name: "Maria Chen", role: "Head of Curriculum", initial: "M" },
  { name: "James Park", role: "VP Engineering", initial: "J" },
  { name: "Leila Torres", role: "Head of Growth", initial: "L" },
];

const VALUES = [
  { icon: <Heart size={24}/>, title: "Learning should feel good", desc: "We believe that struggle, discovery, and the aha moment are the best feeling in the world. We design for delight." },
  { icon: <Lightbulb size={24}/>, title: "Understanding over memorization", desc: "Facts fade. Intuition lasts. Every lesson is built to create lasting understanding, not short-term recall." },
  { icon: <Globe size={24}/>, title: "Knowledge for everyone", desc: "World-class education shouldn't be gated by geography, wealth, or background. We're building for everyone." },
  { icon: <Target size={24}/>, title: "Doing beats watching", desc: "Passive content doesn't build skills. Real mastery comes from active problem solving — that's our whole model." },
];

const About = () => (
  <div className="about-page">
    {/* HERO */}
    <section className="about-hero">
      <div className="ah-inner">
        <div className="section-label">About us</div>
        <h1>We're on a mission to make the world more thoughtful</h1>
        <p>Brilliant was founded in 2012 with one conviction: the best way to learn is by doing. We've built a product that makes complex ideas intuitive through interactive exploration.</p>
      </div>
    </section>

    {/* STATS */}
    <section className="about-stats">
      <div className="as-inner">
        {[
          { val: "10M+",  lbl: "Learners worldwide" },
          { val: "60+",   lbl: "Interactive courses" },
          { val: "190+",  lbl: "Countries reached" },
          { val: "2012",  lbl: "Founded" },
        ].map(s => (
          <div key={s.lbl} className="as-stat">
            <div className="as-val">{s.val}</div>
            <div className="as-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
    </section>

    {/* STORY */}
    <section className="about-story">
      <div className="story-inner">
        <div className="story-text">
          <div className="section-label">Our story</div>
          <h2>Built by people who love learning</h2>
          <p>Brilliant started as a math competition platform, where the toughest problems attracted the most curious minds. We quickly realized: people didn't just want answers — they wanted to understand.</p>
          <p>So we rebuilt everything around understanding. Today, Brilliant is a full learning platform trusted by students, professionals, and teams at the world's leading companies.</p>
          <Link to="/courses" className="btn-primary">Explore courses <ArrowRight size={16}/></Link>
        </div>
        <div className="story-visual">
          <div className="story-card">
            <div className="sc-line" />
            <div className="sc-year">2012</div>
            <div className="sc-event">Founded in San Francisco</div>
            <div className="sc-line" />
            <div className="sc-year">2015</div>
            <div className="sc-event">Launched interactive courses</div>
            <div className="sc-line" />
            <div className="sc-year">2019</div>
            <div className="sc-event">Reached 5 million learners</div>
            <div className="sc-line" />
            <div className="sc-year">2023</div>
            <div className="sc-event">10M+ learners in 190+ countries</div>
          </div>
        </div>
      </div>
    </section>

    {/* VALUES */}
    <section className="about-values">
      <div className="av-inner">
        <div className="section-label">Our values</div>
        <h2 className="section-title">What drives everything we build</h2>
        <div className="values-grid">
          {VALUES.map(v => (
            <div key={v.title} className="value-card">
              <div className="vc-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TEAM */}
    <section className="about-team">
      <div className="ateam-inner">
        <div className="section-label">The team</div>
        <h2 className="section-title">Meet some of us</h2>
        <div className="team-grid">
          {TEAM.map(m => (
            <div key={m.name} className="team-card">
              <div className="tm-avatar">{m.initial}</div>
              <div className="tm-name">{m.name}</div>
              <div className="tm-role">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="about-cta">
      <div className="acta-inner">
        <h2>Come learn with us</h2>
        <p>Join 10 million people building real understanding.</p>
        <Link to="/signup" className="btn-primary large">Get started free <ArrowRight size={17}/></Link>
      </div>
    </section>
  </div>
);

export default About;
