import { useState } from 'react'
import '../style/interview.scss'

// ── Mock Data ────────────────────────────────────────────────────────────
const report = {
    "message": "Interview report generated successfully",
    "interviewReport": {
        "matchScore": 92,
        "technicalQuestions": [
            {
                "question": "You mentioned improving Core Web Vitals by 75%. Can you walk us through the specific metrics you targeted and the technical steps you took to achieve this?",
                "intention": "To verify the candidate's depth of knowledge in performance optimization and ensure they understand the 'why' behind the improvements.",
                "answer": "The candidate should discuss LCP, FID, and CLS. They should mention techniques like image optimization, code splitting (React.lazy/Suspense), reducing main-thread blocking time, and using tools like Lighthouse or WebPageTest to identify bottlenecks."
            },
            {
                "question": "When building a reusable component library, how do you balance flexibility (props) with maintainability and consistency?",
                "intention": "To assess the candidate's experience in frontend architecture and their ability to create scalable systems as requested in the JD.",
                "answer": "Focus on the use of TypeScript interfaces for strict typing, composition patterns instead of prop drilling, and documentation. Mentioning design tokens or a theme provider for consistent styling is a plus."
            },
            {
                "question": "How do you decide between using React Context API, Redux, or a library like Zustand for state management in a large-scale application?",
                "intention": "To test the candidate's understanding of different state management paradigms mentioned in the job description.",
                "answer": "Compare the use cases: Context for low-frequency updates (theming/auth), Redux for complex global state with middleware needs, and Zustand for a lighter, more modern alternative. Discuss performance implications like unnecessary re-renders."
            }
        ],
        "behavioralQuestions": [
            {
                "question": "Describe a situation where you had a disagreement with a UI/UX designer regarding a specific implementation. How did you handle it?",
                "intention": "To evaluate collaboration skills and the ability to find a middle ground between design vision and technical feasibility.",
                "answer": "Use the STAR method. Focus on communication, showing empathy for the user experience, and providing technical alternatives that still met the design goals without compromising performance."
            },
            {
                "question": "As a Senior Engineer, how do you approach code reviews for junior developers to ensure quality without discouraging them?",
                "intention": "To check for mentorship capabilities and team leadership potential.",
                "answer": "Mention setting clear standards, using 'we' instead of 'you', explaining the 'why' behind suggestions, and highlighting positive aspects of the code, not just errors."
            }
        ],
        "skillGaps": [
            {
                "skill": "CSS-in-JS (Styled Components/Emotion)",
                "severity": "low"
            },
            {
                "skill": "Cypress (End-to-End Testing)",
                "severity": "medium"
            },
            {
                "skill": "Specific State Management Libraries (Redux/Zustand)",
                "severity": "low"
            }
        ],
        "preparationPlan": [
            {
                "day": 1,
                "focus": "Deep Dive into State Management",
                "tasks": [
                    "Review Redux Toolkit and Zustand documentation",
                    "Implement a small project using Zustand to compare with Context API",
                    "Study performance optimization for React Context"
                ],
                "_id": "69d3aafd890559636be3b237"
            },
            {
                "day": 2,
                "focus": "Styling and Design Implementation",
                "tasks": [
                    "Practice building a complex layout using Styled Components",
                    "Read about theming and design systems in React",
                    "Review CSS Grid and Flexbox for pixel-perfect implementations"
                ],
                "_id": "69d3aafd890559636be3b238"
            },
            {
                "day": 3,
                "focus": "Testing Frameworks",
                "tasks": [
                    "Write integration tests using React Testing Library",
                    "Set up a basic Cypress environment and write one E2E test",
                    "Review mocking API calls in Jest using MSW"
                ],
                "_id": "69d3aafd890559636be3b239"
            },
            {
                "day": 4,
                "focus": "Performance and SSR",
                "tasks": [
                    "Review Next.js rendering strategies (SSR, SSG, ISR)",
                    "Deep dive into Apollo Client for GraphQL caching strategies",
                    "Audit a personal project using Lighthouse and fix one performance issue"
                ],
                "_id": "69d3aafd890559636be3b23a"
            },
            {
                "day": 5,
                "focus": "Soft Skills and Behavioral Prep",
                "tasks": [
                    "Prepare STAR stories for mentorship and collaboration scenarios",
                    "Review the company's tech blog or public engineering talks",
                    "Practice explaining technical architectural decisions clearly"
                ],
                "_id": "69d3aafd890559636be3b23b"
            }
        ]
    }
}

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')

    const { interviewReport } = report
    const { matchScore, technicalQuestions, behavioralQuestions, skillGaps, preparationPlan } = interviewReport

    const scoreColor =
        matchScore >= 80 ? 'score--high' :
            matchScore >= 60 ? 'score--mid' : 'score--low'

    const scoreLabel =
        matchScore >= 80 ? 'Strong match for this role' :
            matchScore >= 60 ? 'Moderate match for this role' : 'Needs improvement'

    return (
        <div className='interview-page'>
            <div className='interview-layout'>

                {/* ── Left Nav ── */}
                <nav className='interview-nav'>
                    <div className="nav-content">
                        <p className='interview-nav__label'>Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='interview-nav__icon'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </nav>

                <div className='interview-divider' />

                {/* ── Center Content ── */}
                <main className='interview-content'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='content-header'>
                                <h2>Technical Questions</h2>
                                <span className='content-header__count'>{technicalQuestions.length} questions</span>
                            </div>
                            <div className='q-list'>
                                {technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='content-header'>
                                <h2>Behavioral Questions</h2>
                                <span className='content-header__count'>{behavioralQuestions.length} questions</span>
                            </div>
                            <div className='q-list'>
                                {behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='content-header'>
                                <h2>Preparation Road Map</h2>
                                <span className='content-header__count'>{preparationPlan.length}-day plan</span>
                            </div>
                            <div className='roadmap-list'>
                                {preparationPlan.map((day) => (
                                    <RoadMapDay key={day._id} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <div className='interview-divider' />

                {/* ── Right Sidebar ── */}
                <aside className='interview-sidebar'>

                    {/* Match Score */}
                    <div className='match-score'>
                        <p className='match-score__label'>Match Score</p>
                        <div className={`match-score__ring ${scoreColor}`}>
                            <span className='match-score__value'>{matchScore}</span>
                            <span className='match-score__pct'>%</span>
                        </div>
                        <p className='match-score__sub'>{scoreLabel}</p>
                    </div>

                    <div className='sidebar-divider' />

                    {/* Skill Gaps */}
                    <div className='skill-gaps'>
                        <p className='skill-gaps__label'>Skill Gaps</p>
                        <div className='skill-gaps__list'>
                            {skillGaps.map((gap, i) => (
                                <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview