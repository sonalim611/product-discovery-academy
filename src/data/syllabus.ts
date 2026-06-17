// src/data/syllabus.ts

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  contentHtml: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: 'search' | 'chart' | 'shield'; // Lucide icon mapping identifier
  lessons: Lesson[];
  quiz: Quiz;
}

export const syllabus: Module[] = [
  {
    id: 'problem-discovery',
    title: '1. Problem Discovery',
    description: 'Master the art of customer empathy and uncover deep, high-value user pain points rather than jumping straight to solutions.',
    icon: 'search',
    lessons: [
      {
        id: 'what-is-discovery',
        title: 'What is Problem Discovery?',
        duration: '5 min',
        summary: 'Learn why PMs fail by jumping to solutions first and how to establish a problem-centric mindset.',
        contentHtml: `
          <div class="lesson-prose">
            <h1>What is Problem Discovery?</h1>
            <p>In product management, the single biggest point of failure is building a product that nobody wants. This usually happens because we start with a <strong>solution</strong> in mind and search for a problem to justify it. Problem Discovery is the disciplined practice of exploring the user's world to uncover genuine frustrations, needs, and desires before designing any features.</p>
            
            <blockquote>
              "If I had an hour to solve a problem I'd spend 55 minutes thinking about the problem and 5 minutes thinking about solutions." <br/>— commonly attributed to Albert Einstein
            </blockquote>
            
            <h2>The Solution Trap</h2>
            <p>Why do we fall into the Solution Trap? As humans, we are wired to resolve tension quickly. Seeing a problem makes us want to fix it immediately. However, the first solution that comes to mind is rarely the best one, and it is often based on unverified assumptions.</p>
            <p>Problem discovery forces you to build a deep understanding of:</p>
            <ul>
              <li><strong>Who</strong> is the user experiencing the pain?</li>
              <li><strong>What</strong> is the exact context and frequency of the pain?</li>
              <li><strong>Why</strong> does it matter to them (emotional and functional triggers)?</li>
              <li><strong>How</strong> are they solving it today (existing workarounds)?</li>
            </ul>

            <h2>Continuous vs. Dual-Track Discovery</h2>
            <p>Traditionally, discovery was done in a big upfront batch at the start of a project (waterfall discovery). Modern product teams use <strong>Continuous Discovery</strong>, a weekly cadence of talking to customers, run in parallel with delivery (development).</p>
            <p>This ensures that the product team is always learning and adapting, rather than building based on outdated research or initial assumptions.</p>
          </div>
        `
      },
      {
        id: 'user-interviews',
        title: 'Conducting User Interviews',
        duration: '7 min',
        summary: 'Learn how to run effective user interviews, avoid leading questions, and uncover the truth.',
        contentHtml: `
          <div class="lesson-prose">
            <h1>Conducting Effective User Interviews</h1>
            <p>Talking to customers sounds easy, but doing it in a way that yields unbiased, actionable insights is a science. People naturally want to please you, and if you ask them about the future, they will lie (unintentionally). To get the truth, you must focus on the past and present.</p>

            <h2>The Golden Rule: Don't Ask About the Future</h2>
            <p>If you ask a user: <em>"Would you buy a tool that automatically generates reports?"</em>, they will say: <em>"Yes, definitely!"</em>. It costs them nothing to say yes. However, when you launch it and charge $20/month, they disappear.</p>
            <p>Instead, ask about their past behavior: <em>"Tell me about the last time you had to create a report. Walk me through exactly what you did, step-by-step."</em></p>

            <h2>Avoid Leading Questions</h2>
            <p>A leading question guides the user toward a specific answer. Look at these contrasts:</p>
            <table>
              <thead>
                <tr>
                  <th style="text-align: left; padding: 8px; border-bottom: 2px solid var(--color-border-card)">Leading (Bad)</th>
                  <th style="text-align: left; padding: 8px; border-bottom: 2px solid var(--color-border-card)">Neutral (Good)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid var(--color-border-card)">"Do you find our current checkout page frustrating?"</td>
                  <td style="padding: 8px; border-bottom: 1px solid var(--color-border-card)">"Walk me through your experience during your last checkout."</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid var(--color-border-card)">"Would you use a feature that does X?"</td>
                  <td style="padding: 8px; border-bottom: 1px solid var(--color-border-card)">"How do you currently handle X? What challenges do you face?"</td>
                </tr>
              </tbody>
            </table>

            <h2>The Five Whys Technique</h2>
            <p>To get to the root cause of a user's behavior, use the "Five Whys" technique developed by Sakichi Toyoda. Keep drilling down until you reach the underlying emotional or structural reason for their action:</p>
            <ol>
              <li>"Why did you export the spreadsheet manually?" <em>Because the report was missing data.</em></li>
              <li>"Why was it missing data?" <em>Because the database doesn't sync in real time.</em></li>
              <li>"Why does it need to sync in real time?" <em>Because I have to show live metrics to my VP at 9 AM.</em></li>
              <li>"Why do you need live metrics?" <em>Because he makes daily spending changes based on them.</em></li>
              <li>"Why does he make daily changes?" <em>Because our ad campaigns fluctuate rapidly and we lose money if we don't adjust them.</em> (Ah! The real problem is financial loss due to slow ad budget adjustment, not just a spreadsheet export!)</li>
            </ol>
          </div>
        `
      },
      {
        id: 'continuous-discovery',
        title: 'Continuous Discovery Framework',
        duration: '6 min',
        summary: 'Explore Teresa Torres\' Continuous Discovery Habits and Opportunity Solution Trees.',
        contentHtml: `
          <div class="lesson-prose">
            <h1>Continuous Discovery Habits</h1>
            <p>Product discovery is not a phase you complete and move on from. It is a continuous habit. Teresa Torres, author of <em>Continuous Discovery Habits</em>, defines it as: <strong>"Weekly touchpoints with customers, by the team that is building the product, conducting small research activities, in pursuit of a desired outcome."</strong></p>

            <h2>The Product Trio</h2>
            <p>Continuous discovery is led by the <strong>Product Trio</strong>:</p>
            <ul>
              <li><strong>Product Manager</strong> (evaluates business viability and value)</li>
              <li><strong>Product Designer</strong> (evaluates usability and desirability)</li>
              <li><strong>Tech Lead / Engineer</strong> (evaluates technical feasibility)</li>
            </ul>
            <p>By working together on discovery, the trio aligns on the problem space early, preventing hand-off delays and building shared empathy for the user.</p>

            <h2>The Opportunity Solution Tree (OST)</h2>
            <p>An OST is a visual aid that helps the trio map out the path to their goal. It has four levels:</p>
            <ol>
              <li><strong>Outcome</strong>: A clear, measurable business goal (e.g., Increase user retention by 10%).</li>
              <li><strong>Opportunities</strong>: Customer pain points, needs, or desires that, if addressed, will drive the outcome (e.g., "I get lost in the onboarding flow").</li>
              <li><strong>Solutions</strong>: Potential ways to resolve an opportunity (e.g., "Interactive onboarding checklist").</li>
              <li><strong>Assumption Tests</strong>: Quick experiments to validate if a solution actually works (e.g., "Run a smoke test for onboarding Checklist click-rates").</li>
            </ol>
            
            <p>By structuring discovery this way, teams avoid falling in love with a single solution. Instead, they frame solutions as experiments designed to solve specific customer opportunities that serve a business outcome.</p>
          </div>
        `
      }
    ],
    quiz: {
      id: 'quiz-problem-discovery',
      title: 'Problem Discovery Quiz',
      questions: [
        {
          id: 'pd-q1',
          question: 'What is the "Solution Trap" in Product Management?',
          options: [
            'Developing a product without using any code.',
            'Jumping to a specific solution before fully understanding the customer problem.',
            'Failing to find developers who can code your solution.',
            'Setting up too many customer interviews.'
          ],
          correctOptionIndex: 1,
          explanation: 'The Solution Trap is the cognitive bias where we jump to a solution immediately upon hearing about a problem, without taking time to explore the root cause or existing workarounds.'
        },
        {
          id: 'pd-q2',
          question: 'Which of the following questions is the best way to uncover true customer behavior in an interview?',
          options: [
            '"Would you pay $5/month for a reminder feature?"',
            '"Do you think you will use our app next week?"',
            '"Walk me through what you did the last time you forgot to complete a task."',
            '"Don\'t you think a reminder feature would be helpful?"'
          ],
          correctOptionIndex: 2,
          explanation: 'Focusing on concrete past behavior ("Walk me through what you did...") provides reliable, factual data about how users solve problems today. Future-looking questions ("Would you...", "Do you think...") invite speculative, unreliable answers.'
        },
        {
          id: 'pd-q3',
          question: 'Who makes up the "Product Trio" in Teresa Torres\' Continuous Discovery framework?',
          options: [
            'CEO, Product Manager, Sales Lead',
            'Product Manager, Product Designer, Tech Lead/Engineer',
            'UX Researcher, Designer, Frontend Engineer',
            'Product Manager, Quality Analyst, Scrum Master'
          ],
          correctOptionIndex: 1,
          explanation: 'The Product Trio consists of a Product Manager, a Product Designer, and a Tech Lead. Together, they balance viability, desirability, and feasibility throughout the continuous discovery cycle.'
        }
      ]
    }
  },
  {
    id: 'opportunity-sizing',
    title: '2. Opportunity Sizing',
    description: 'Learn how to quantify and prioritize the customer opportunities you find using frameworks like RICE/ICE and bottom-up market sizing.',
    icon: 'chart',
    lessons: [
      {
        id: 'defining-opportunities',
        title: 'Defining the Opportunity Space',
        duration: '5 min',
        summary: 'Learn how to translate user complaints into clear, actionable opportunity statements.',
        contentHtml: `
          <div class="lesson-prose">
            <h1>Defining the Opportunity Space</h1>
            <p>Once you start talking to customers, you will collect a mountain of data. The next step is translating raw customer feedback into structured, size-able <strong>opportunities</strong>.</p>
            
            <h2>What is an Opportunity?</h2>
            <p>An opportunity is not a feature request. If a customer says, <em>"I want an Excel export button,"</em> the opportunity is not "Add Excel export." The opportunity is the underlying need: <strong>"I need to share data with colleagues who don't have accounts."</strong> or <strong>"I need to perform custom mathematical formulas on my sales metrics."</strong></p>
            
            <h2>Writing Opportunity Statements</h2>
            <p>A good opportunity statement is framed from the user's perspective, focusing on the pain point without prescribing the solution. Use this format:</p>
            <blockquote>
              <strong>"As a [User Segment], I struggle to [User Need/Pain] because [Root Cause], which results in [Negative Outcome]."</strong>
            </blockquote>
            
            <p>Example comparison:</p>
            <ul>
              <li><strong>Weak Opportunity</strong>: "Add PDF invoices." (This is a solution, not an opportunity.)</li>
              <li><strong>Strong Opportunity</strong>: "Freelancers struggle to submit invoices in their clients' custom formats, which leads to late payments." (This leaves room for multiple solutions: CSV export, invoice builder, API sync, etc.)</li>
            </ul>

            <h2>Grouping Opportunities</h2>
            <p>Group related feedback together. If five users mention trouble finding the save button, and ten mention losing their draft work, they might roll up under a broader opportunity: <em>"Users lose progress when their session unexpectedly expires."</em> This helps you prioritize major themes rather than small, isolated tickets.</p>
          </div>
        `
      },
      {
        id: 'rice-scoring',
        title: 'Prioritization with RICE & ICE',
        duration: '6 min',
        summary: 'Learn how to mathematically score ideas using Reach, Impact, Confidence, and Effort.',
        contentHtml: `
          <div class="lesson-prose">
            <h1>Prioritization: RICE & ICE</h1>
            <p>As a PM, you will always have more opportunities than time. You need a structured, objective framework to decide what to build first. The two most popular scoring frameworks are <strong>RICE</strong> and <strong>ICE</strong>.</p>

            <h2>The RICE Framework</h2>
            <p>RICE was created by Intercom to help teams prioritize features. It scores opportunities based on four metrics:</p>
            <ol>
              <li><strong>Reach</strong>: How many users will this affect in a given time period? (e.g., 5,000 users per month).</li>
              <li><strong>Impact</strong>: How much will this contribute to our key outcome for each user?
                <ul>
                  <li>3 = Massive impact</li>
                  <li>2 = High impact</li>
                  <li>1 = Medium impact</li>
                  <li>0.5 = Low impact</li>
                  <li>0.25 = Minimal impact</li>
                </ul>
              </li>
              <li><strong>Confidence</strong>: How sure are we about our estimates (Reach, Impact, Effort)?
                <ul>
                  <li>100% = High confidence (supported by data, research, prototypes)</li>
                  <li>80% = Medium confidence (qualitative evidence, some assumptions)</li>
                  <li>50% = Low confidence (guesswork, speculative)</li>
                </ul>
              </li>
              <li><strong>Effort</strong>: How much time will it take from product, design, and engineering? Measured in "person-months" (e.g., 2 person-months).</li>
            </ol>

            <p>The RICE score formula is:</p>
            <blockquote>
              <strong>RICE Score = (Reach × Impact × Confidence) / Effort</strong>
            </blockquote>

            <h2>The ICE Framework</h2>
            <p>ICE is a simpler, quicker alternative often used by growth and early-stage startup teams. It uses a 1-10 scale for each of its three metrics:</p>
            <ul>
              <li><strong>Impact</strong> (1-10): How much will this move our primary metric?</li>
              <li><strong>Confidence</strong> (1-10): How sure are we this will succeed?</li>
              <li><strong>Ease</strong> (1-10): How easy is this to build? (High ease = low effort).</li>
            </ul>
            <p>The ICE score formula is:</p>
            <blockquote>
              <strong>ICE Score = Impact × Confidence × Ease</strong>
            </blockquote>
          </div>
        `
      },
      {
        id: 'market-sizing',
        title: 'Bottom-Up Market Sizing',
        duration: '6 min',
        summary: 'Calculate TAM, SAM, and SOM to estimate the business value of an opportunity.',
        contentHtml: `
          <div class="lesson-prose">
            <h1>Market Sizing: TAM, SAM, SOM</h1>
            <p>Even if an opportunity has high RICE score, is it worth pursuing from a business perspective? To answer this, you must size the market. This tells you the maximum potential revenue your product can capture.</p>

            <h2>The Sizing Stack</h2>
            <ul>
              <li><strong>TAM (Total Addressable Market)</strong>: The entire global market demand for your product category if you captured 100% share (e.g., All businesses globally that use email marketing software).</li>
              <li><strong>SAM (Serviceable Addressable Market)</strong>: The portion of the TAM that fits your specific target profile, technology, and geography (e.g., Small businesses in North America that use email marketing).</li>
              <li><strong>SOM (Serviceable Obtainable Market)</strong>: The realistic portion of the SAM that you can capture in the next 3-5 years, accounting for competition and sales capacity.</li>
            </ul>

            <h2>Top-Down vs. Bottom-Up Sizing</h2>
            <p>There are two ways to calculate these numbers:</p>
            <ol>
              <li><strong>Top-Down (Avoid)</strong>: Taking broad industry analyst reports (e.g., Gartner states the email market is $10B) and guessing your share: <em>"We will capture 1% of this, so our market is $100M."</em> This is unreliable and lacks logical foundation.</li>
              <li><strong>Bottom-Up (Recommended)</strong>: Starting with primary data, such as your price point and target customer count:
                <br/>
                <code>Market Size = Number of Target Accounts × Price per Account per Year</code>
              </li>
            </ol>
            
            <p>Example: If you are building billing software for dental clinics in the US:</p>
            <ul>
              <li>There are 200,000 dental clinics in the US (Target Accounts).</li>
              <li>Your software costs $150/month ($1,800/year).</li>
              <li>SAM = 200,000 × $1,800 = $360 Million per year.</li>
              <li>If you target capturing 5% of this in 3 years, your SOM is $18 Million.</li>
            </ul>
          </div>
        `
      }
    ],
    quiz: {
      id: 'quiz-opportunity-sizing',
      title: 'Opportunity Sizing Quiz',
      questions: [
        {
          id: 'os-q1',
          question: 'Calculate the RICE score: Reach = 2000, Impact = 2 (High), Confidence = 80% (0.8), Effort = 4 person-months.',
          options: [
            '800',
            '400',
            '3,200',
            '1,000'
          ],
          correctOptionIndex: 0,
          explanation: 'RICE = (Reach * Impact * Confidence) / Effort. So: (2000 * 2 * 0.8) / 4 = 3200 / 4 = 800.'
        },
        {
          id: 'os-q2',
          question: 'What is the main advantage of bottom-up market sizing over top-down market sizing?',
          options: [
            'It is faster to find on Google.',
            'It relies on your own concrete pricing and target customer data rather than generic industry reports.',
            'It always results in a larger market size.',
            'It does not require any mathematics.'
          ],
          correctOptionIndex: 1,
          explanation: 'Bottom-up sizing uses concrete data points (e.g. number of clinics * subscription price) which forces you to prove your market exists, whereas top-down sizing relies on broad, often irrelevant macro-industry numbers.'
        },
        {
          id: 'os-q3',
          question: 'If a user requests a "Dark Mode toggle", how should a PM translate this into an opportunity?',
          options: [
            'Write the ticket: "Build Dark Mode".',
            'Ignore it, since visual elements are not product opportunities.',
            'Understand the underlying user pain, such as: "Users experience eye strain when working late at night in low-light environments."',
            'Tell the user they should adjust their screen brightness.'
          ],
          correctOptionIndex: 2,
          explanation: 'Translating feature requests into core user problems/needs (e.g. eye strain at night) allows you to address the root issue. It also might reveal alternative solutions, like adjusting color contrast or auto-switching layouts.'
        }
      ]
    }
  },
  {
    id: 'solution-validation',
    title: '3. Solution Validation',
    description: 'De-risk your product features. Learn how to map key assumptions and run rapid usability, viability, and feasibility experiments.',
    icon: 'shield',
    lessons: [
      {
        id: 'assumptions-mapping',
        title: 'Risk & Assumptions Mapping',
        duration: '5 min',
        summary: 'Learn how to identify and prioritize the leap-of-faith assumptions behind your solution.',
        contentHtml: `
          <div class="lesson-prose">
            <h1>Risk & Assumptions Mapping</h1>
            <p>Every solution is built on a mountain of unstated assumptions. If any of these assumptions are wrong, your solution will fail. Solution Validation is the process of testing these assumptions before building the final product.</p>

            <h2>The Four Categories of Risk</h2>
            <p>Marty Cagan, author of <em>Inspired</em>, categorizes product risks into four buckets:</p>
            <ol>
              <li><strong>Value Risk</strong>: Will customers buy it or choose to use it?</li>
              <li><strong>Usability Risk</strong>: Can users figure out how to use it?</li>
              <li><strong>Feasibility Risk</strong>: Can we build it with the time, technology, and skills we have?</li>
              <li><strong>Business Viability Risk</strong>: Does this solution work for our business (legal, financial, compliance, brand)?</li>
            </ol>

            <h2>The Assumptions Mapping Grid</h2>
            <p>To prioritize what to test, map your assumptions on a 2x2 grid:</p>
            <ul>
              <li><strong>X-axis (Evidence)</strong>: Known (lots of evidence) vs. Unknown (no evidence).</li>
              <li><strong>Y-axis (Importance)</strong>: Critical (business fails if wrong) vs. Marginal (nice-to-know).</li>
            </ul>
            <p>Focus your validation experiments exclusively on the <strong>Critical + Unknown</strong> quadrant. These are your "Leap-of-Faith Assumptions" (LOFAs).</p>
          </div>
        `
      },
      {
        id: 'rapid-prototyping',
        title: 'Rapid Prototyping & MVPs',
        duration: '7 min',
        summary: 'Explore Wizard of Oz, Concierge, and Landing Page MVPs to test value risk.',
        contentHtml: `
          <div class="lesson-prose">
            <h1>Rapid Prototyping & MVPs</h1>
            <p>An MVP (Minimum Viable Product) is not a buggy, low-quality version of your final product. It is the **smallest experiment you can run to validate a critical assumption**.</p>
            
            <h2>Types of Lean MVPs</h2>
            
            <h3>1. The Landing Page Test (Smoke Test)</h3>
            <p>Create a simple landing page describing your value proposition, including screenshots or mockups and a "Buy Now" or "Get Early Access" button. Measure the percentage of visitors who click the button and input their email. This tests <strong>demand</strong> before a single line of backend code is written.</p>
            
            <h3>2. The Wizard of Oz MVP</h3>
            <p>To the user, the product looks fully automated and functional. However, behind the scenes, all the work is done manually by humans (you).
              <br/>
              <em>Example: Zappos started by taking photos of shoes in local stores, posting them online, and buying them at full price from the store to ship manually when someone ordered.</em>
            </p>
            
            <h3>3. The Concierge MVP</h3>
            <p>You don't hide the manual work. You offer the service directly to the customer as a high-touch, customized consulting service. You work side-by-side with them to solve their problem, learning their workflow inside out before automation.
              <br/>
              <em>Example: Food on the Table started by having the founder plan menus and grocery shop manually for their first customers, iterating weekly.</em>
            </p>

            <h2>Prototype Fidelity</h2>
            <ul>
              <li><strong>Low-fidelity (Sketches, Wireframes)</strong>: Use to test concepts and navigation flows. Fast to change, encourages users to focus on the structure rather than visuals.</li>
              <li><strong>High-fidelity (Figma prototypes)</strong>: Use to test usability and micro-interactions. Looks real enough that users behave naturally.</li>
            </ul>
          </div>
        `
      },
      {
        id: 'usability-ab-testing',
        title: 'Usability & A/B Testing',
        duration: '6 min',
        summary: 'Learn how to set up validation experiments, run usability tests, and measure success metrics.',
        contentHtml: `
          <div class="lesson-prose">
            <h1>Usability & A/B Testing</h1>
            <p>Once you have a prototype or MVP, you must observe it in the wild. This involves qualitative usability tests and quantitative A/B experiments.</p>

            <h2>Qualitative Usability Testing</h2>
            <p>When running a usability test, your goal is to observe where users get stuck. Follow these core practices:</p>
            <ul>
              <li><strong>Give tasks, not instructions</strong>: Say: <em>"Show me how you would send an invoice to a client named Sarah,"</em> not: <em>"Click the blue button, then type Sarah."</em></li>
              <li><strong>Encourage thinking aloud</strong>: Ask the user to talk through what they are seeing and thinking.</li>
              <li><strong>Do not correct them</strong>: If they make a mistake, watch how they recover. If you help them, you ruin the test data.</li>
            </ul>

            <h2>Quantitative Validation & A/B Testing</h2>
            <p>If you have high traffic, you can run an A/B test. This splits traffic between a Control (current version) and a Variant (new design) to see which performs better on a key metric (e.g., conversion rate).</p>
            
            <p>Before running any validation test, define your success criteria in writing:</p>
            <blockquote>
              <strong>"We believe that [solution] will result in [metric change]. We will consider this validated if [threshold] is met."</strong>
            </blockquote>
            
            <p><em>Example: "We believe a pre-filled template will increase invoice completion. We will consider this validated if the template variant has a completion rate of at least 75% with statistical significance."</em></p>
          </div>
        `
      }
    ],
    quiz: {
      id: 'quiz-solution-validation',
      title: 'Solution Validation Quiz',
      questions: [
        {
          id: 'sv-q1',
          question: 'What is a "Wizard of Oz" MVP?',
          options: [
            'A product that uses virtual reality to simulate an experience.',
            'An app that is designed by a famous design agency.',
            'A product that looks automated to the user, but is operated manually behind the scenes.',
            'A landing page that collects email addresses.'
          ],
          correctOptionIndex: 2,
          explanation: 'In a Wizard of Oz MVP, the frontend feels like a working software product, but all processes are executed manually behind the scenes, allowing you to validate value risk before building complex backend automation.'
        },
        {
          id: 'sv-q2',
          question: 'When mapping assumptions, which quadrant should you prioritize for validation experiments?',
          options: [
            'Known + Marginal',
            'Unknown + Marginal',
            'Known + Critical',
            'Unknown + Critical'
          ],
          correctOptionIndex: 3,
          explanation: 'You should prioritize assumptions that are highly critical to the business success but currently unknown (have little to no evidence). These are your Leap-of-Faith Assumptions.'
        },
        {
          id: 'sv-q3',
          question: 'What is the most important rule when facilitating a qualitative usability test?',
          options: [
            'Correct the user immediately if they click the wrong button.',
            'Provide step-by-step click instructions to ensure they finish the task.',
            'Observe where the user struggles without intervening or guiding them.',
            'Ask the user what colors they think look best.'
          ],
          correctOptionIndex: 2,
          explanation: 'To truly test usability, you must observe natural behavior. Guiding the user or explaining the interface masks design issues that real users would encounter in the wild.'
        }
      ]
    }
  }
];
export type Syllabus = typeof syllabus;
