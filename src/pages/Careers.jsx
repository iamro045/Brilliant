import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";
import "./Careers.css";

const PERKS = [
  { emoji:"🌍", title:"Remote-first", desc:"Work from anywhere. We have team members across 12 countries." },
  { emoji:"📚", title:"Learning budget", desc:"$2,000/year for courses, conferences, and books. Use it on Brilliant too." },
  { emoji:"🏥", title:"Full health coverage", desc:"Medical, dental, and vision for you and your family, fully covered." },
  { emoji:"🏖️", title:"Unlimited PTO", desc:"We track output, not hours. Take the time you need to do your best work." },
  { emoji:"💰", title:"Competitive comp", desc:"Top-of-market salary plus meaningful equity in a growing company." },
  { emoji:"🍼", title:"Parental leave", desc:"16 weeks fully paid parental leave for all new parents." },
];

const JOBS = [
  { id:1, title:"Senior Frontend Engineer", dept:"Engineering", location:"Remote (US)", type:"Full-time" },
  { id:2, title:"Curriculum Designer — Math", dept:"Content", location:"Remote (Global)", type:"Full-time" },
  { id:3, title:"Product Designer", dept:"Design", location:"San Francisco / Remote", type:"Full-time" },
  { id:4, title:"Data Scientist", dept:"Analytics", location:"Remote (US)", type:"Full-time" },
  { id:5, title:"Growth Marketing Manager", dept:"Marketing", location:"Remote (Global)", type:"Full-time" },
  { id:6, title:"Curriculum Designer — CS", dept:"Content", location:"Remote (Global)", type:"Full-time" },
];

const Careers = () => (
  <div className="careers-page">
    {/* HERO */}
    <section className="careers-hero">
      <div className="ch-inner">
        <div className="section-label">Careers</div>
        <h1>Help us change how the world learns</h1>
        <p>We're a small team with an outsized mission. If you care about education, beautiful products, and clear thinking — you'll fit right in.</p>
        <a href="#openings" className="btn-primary large">See open roles <ArrowRight size={17}/></a>
      </div>
    </section>

    {/* PERKS */}
    <section className="careers-perks">
      <div className="cp-inner">
        <div className="section-label">Benefits</div>
        <h2 className="section-title">We take care of our people</h2>
        <div className="perks-grid">
          {PERKS.map(p => (
            <div key={p.title} className="perk-card">
              <div className="perk-emoji">{p.emoji}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* OPENINGS */}
    <section className="careers-openings" id="openings">
      <div className="co-inner">
        <div className="section-label">Open roles</div>
        <h2 className="section-title">Join the team</h2>
        <div className="jobs-list">
          {JOBS.map(job => (
            <div key={job.id} className="job-row">
              <div className="jr-left">
                <h3>{job.title}</h3>
                <div className="jr-meta">
                  <span><Briefcase size={13}/> {job.dept}</span>
                  <span><MapPin size={13}/> {job.location}</span>
                  <span><Clock size={13}/> {job.type}</span>
                </div>
              </div>
              <a href="#" className="jr-apply">
                Apply <ArrowRight size={14}/>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* NO FIT */}
    <section className="careers-general">
      <div className="cg-inner">
        <h2>Don't see your role?</h2>
        <p>We're always looking for exceptional people. Send us a note and tell us how you'd like to contribute.</p>
        <a href="mailto:careers@brilliant.org" className="btn-primary">Get in touch <ArrowRight size={15}/></a>
      </div>
    </section>
  </div>
);

export default Careers;
