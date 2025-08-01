import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Terminal, Database, Cloud, Settings, Zap, Trophy } from 'lucide-react';

const Installation = () => {
    const [openSections, setOpenSections] = useState({
        quickstart: true,
        render: false,
        database: false,
        advanced: false
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const CodeBlock = ({ children, language = "bash" }) => (
        <div className="bg-gray-900 rounded-lg p-4 my-3 overflow-x-auto">
            <code className="text-green-400 text-sm font-mono whitespace-pre">{children}</code>
        </div>
    );

    const Section = ({ id = "installation", title, icon: Icon, children, defaultOpen = false }) => {
        const isOpen = openSections[id];
        return (
            <div className="border rounded-lg mb-4 overflow-hidden shadow-sm" style={{ borderColor: '#374151', backgroundColor: '#1f2937' }}>
                <button
                    onClick={() => toggleSection(id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:opacity-90 transition-colors"
                    style={{ background: 'linear-gradient(to right, rgba(46, 230, 247, 0.1), rgba(46, 230, 247, 0.2))' }}
                >
                    <div className="flex items-center space-x-3">
                        <Icon className="h-6 w-6" style={{ color: '#2ee6f7' }} />
                        <h2 className="text-xl font-bold text-gray-100">{title}</h2>
                    </div>
                    {isOpen ? <ChevronDown className="h-5 w-5 text-gray-300" /> : <ChevronRight className="h-5 w-5 text-gray-300" />}
                </button>
                {isOpen && (
                    <div className="px-6 py-4">
                        {children}
                    </div>
                )}
            </div>
        );
    };

    const Step = ({ number, title, children }) => (
        <div className="mb-6">
            <div className="flex items-center mb-3">
                <div className="text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3" style={{ backgroundColor: '#2ee6f7' }}>
                    {number}
                </div>
                <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
            </div>
            <div className="ml-11">
                {children}
            </div>
        </div>
    );

    const Prerequisite = ({ children }) => (
        <div className="flex items-center mb-2">
            <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#2ee6f7' }}></div>
            <span className="text-gray-300">{children}</span>
        </div>
    );

    return (
        <section id="Installation">
            <div className="max-w-4xl mx-auto p-6 min-h-screen min-w-[99vw]" style={{ background: 'linear-gradient(to bottom right, #0f172a, #1e293b)' }}>
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4" style={{ background: 'linear-gradient(to right, #2ee6f7, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        VAISH Discord Bot
                    </h1>
                    <p className="text-xl text-gray-300">Ultra-Modern AI Discord Bot Installation Guide</p>
                </div>

                {/* Quick Start Section */}
                <Section id="quickstart" title="Quick Start" icon={Zap}>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-100 mb-4">Prerequisites</h3>
                        <div className="rounded-lg p-4" style={{ backgroundColor: '#374151' }}>
                            <Prerequisite><strong>Node.js</strong> v16.0.0 or higher</Prerequisite>
                            <Prerequisite><strong>MongoDB</strong> database (local or cloud)</Prerequisite>
                            <Prerequisite><strong>Discord Bot Token</strong> (Get one <a href="#" className="hover:underline" style={{ color: '#2ee6f7' }}>here</a>)</Prerequisite>
                            <Prerequisite><strong>Google Gemini API Key</strong> (Get one <a href="#" className="hover:underline" style={{ color: '#2ee6f7' }}>here</a>)</Prerequisite>
                        </div>
                    </div>

                    <Step number="1" title="Clone the repository">
                        <CodeBlock>
                            {`git clone https://github.com/yourusername/VAISH-discord-bot.git
cd VAISH-discord-bot`}
                        </CodeBlock>
                    </Step>

                    <Step number="2" title="Install dependencies">
                        <CodeBlock>npm install</CodeBlock>
                    </Step>

                    <Step number="3" title="Configure environment variables">
                        <p className="text-gray-300 mb-3">Create a <code className="px-2 py-1 rounded" style={{ backgroundColor: '#4b5563' }}>.env</code> file:</p>
                        <CodeBlock>
                            {`DISCORD_TOKEN=your_discord_bot_token_here
CLIENT_ID=your_bot_client_id_here
GUILD_ID=your_test_guild_id_here
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key_here`}
                        </CodeBlock>
                    </Step>

                    <Step number="4" title="Deploy slash commands">
                        <CodeBlock>node deploy-commands.js</CodeBlock>
                    </Step>

                    <Step number="5" title="Start the bot">
                        <CodeBlock>npm start</CodeBlock>
                    </Step>
                </Section>

                {/* Render Deployment Section */}
                <Section id="render" title="Deploy to Render (Free)" icon={Cloud}>
                    <p className="text-gray-300 mb-6">Deploy your bot for free on Render with these simple steps:</p>

                    <Step number="1" title="Prepare Your Repository">
                        <div className="text-gray-300">
                            <p className="mb-2">1. Fork this repository to your GitHub account</p>
                            <p>2. Clone your fork locally and configure your <code className="px-2 py-1 rounded" style={{ backgroundColor: '#4b5563' }}>.env</code> file</p>
                        </div>
                    </Step>

                    <Step number="2" title="Deploy on Render">
                        <div className="text-gray-300 mb-4">
                            <p className="mb-2">1. Go to Render.com and sign up</p>
                            <p className="mb-2">2. Click "New +" → "Web Service"</p>
                            <p className="mb-2">3. Connect your GitHub repository</p>
                            <p className="mb-2">4. Configure your service:</p>
                        </div>
                        <CodeBlock>
                            {`Name: VAISH - Ultra-Modern AI Discord Bot
Environment: Node
Build Command: npm install
Start Command: node index.js`}
                        </CodeBlock>
                    </Step>

                    <Step number="3" title="Set Environment Variables">
                        <p className="text-gray-300 mb-3">Add these environment variables in Render dashboard:</p>
                        <div className="rounded-lg p-4" style={{ backgroundColor: '#374151' }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div><code className="text-sm text-gray-200">DISCORD_TOKEN</code> - Your Discord bot token</div>
                                <div><code className="text-sm text-gray-200">CLIENT_ID</code> - Your bot's client ID</div>
                                <div><code className="text-sm text-gray-200">MONGODB_URI</code> - Your MongoDB connection string</div>
                                <div><code className="text-sm text-gray-200">GEMINI_API_KEY</code> - Your Google Gemini API key</div>
                            </div>
                        </div>
                    </Step>

                    <Step number="4" title="Deploy Commands">
                        <p className="text-gray-300 mb-3">After first deployment, run this once in Render shell:</p>
                        <CodeBlock>node deploy-commands.js</CodeBlock>
                    </Step>

                    <div className="mt-6 border-l-4 p-4" style={{ backgroundColor: 'rgba(46, 230, 247, 0.1)', borderColor: '#2ee6f7' }}>
                        <h4 className="font-semibold mb-2" style={{ color: '#0891b2' }}>💡 Render Configuration Tips</h4>
                        <ul className="space-y-1" style={{ color: '#0e7490' }}>
                            <li><strong>Auto-Deploy:</strong> Enable auto-deploy for seamless updates</li>
                            <li><strong>Health Check:</strong> Set health check path to <code>/</code> if you add a web endpoint</li>
                            <li><strong>Environment:</strong> Production environment for better performance</li>
                            <li><strong>Scaling:</strong> Free tier includes 512MB RAM and shared CPU</li>
                        </ul>
                    </div>
                </Section>

                {/* Database Setup Section */}
                <Section id="database" title="Database Setup" icon={Database}>
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">MongoDB Options</h3>

                    <div className="space-y-6">
                        <div className="border rounded-lg p-4" style={{ borderColor: '#2ee6f7', backgroundColor: 'rgba(46, 230, 247, 0.1)' }}>
                            <h4 className="font-semibold mb-2" style={{ color: '#0891b2' }}>Option 1: MongoDB Atlas (Recommended)</h4>
                            <div style={{ color: '#0e7490' }}>
                                <p className="mb-1">1. Go to MongoDB Atlas</p>
                                <p className="mb-1">2. Create free account and cluster</p>
                                <p>3. Get connection string and add to <code className="px-1 rounded" style={{ backgroundColor: 'rgba(46, 230, 247, 0.2)' }}>.env</code></p>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4" style={{ borderColor: '#2ee6f7', backgroundColor: 'rgba(46, 230, 247, 0.05)' }}>
                            <h4 className="font-semibold mb-2" style={{ color: '#0891b2' }}>Option 2: Local MongoDB</h4>
                            <CodeBlock>
                                {`# Install MongoDB locally
npm install -g mongodb
mongod --dbpath ./data`}
                            </CodeBlock>
                        </div>

                        <div className="border rounded-lg p-4" style={{ borderColor: '#2ee6f7', backgroundColor: 'rgba(46, 230, 247, 0.05)' }}>
                            <h4 className="font-semibold mb-2" style={{ color: '#0891b2' }}>Option 3: Railway MongoDB</h4>
                            <div style={{ color: '#0e7490' }}>
                                <p className="mb-1">1. Create Railway account</p>
                                <p className="mb-1">2. Add MongoDB service</p>
                                <p>3. Copy connection string to <code className="px-1 rounded" style={{ backgroundColor: 'rgba(46, 230, 247, 0.2)' }}>.env</code></p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 rounded-lg p-4" style={{ backgroundColor: '#374151' }}>
                        <h4 className="font-semibold text-gray-100 mb-3">Database Features</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#2ee6f7' }}></div>
                                <span className="text-sm text-gray-300"><strong>Automatic Schema Creation</strong> - Tables created automatically</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-300"><strong>Data Persistence</strong> - All user data, XP, points, tickets stored</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-300"><strong>Backup Ready</strong> - Easy export/import capabilities</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-300"><strong>Scalable</strong> - Handles unlimited users and servers</span>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Advanced Configuration Section */}
                <Section id="advanced" title="Advanced Configuration" icon={Settings}>
                    <div className="space-y-6">
                        <div className="border rounded-lg p-4" style={{ borderColor: '#2ee6f7', backgroundColor: 'rgba(46, 230, 247, 0.1)' }}>
                            <h4 className="font-semibold mb-2" style={{ color: '#0891b2' }}>AI Assistant Setup</h4>
                            <div className="space-y-1" style={{ color: '#0e7490' }}>
                                <p>1. Get Gemini API key from Google AI Studio</p>
                                <p>2. Add to environment variables</p>
                                <p>3. Bot automatically handles rate limiting and errors</p>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4" style={{ borderColor: '#2ee6f7', backgroundColor: 'rgba(46, 230, 247, 0.05)' }}>
                            <h4 className="font-semibold mb-2" style={{ color: '#0891b2' }}>XP System Configuration</h4>
                            <CodeBlock>
                                {`// Configure XP rates (Admin only)
/xpconfig
- XP per message: 1-10
- XP per voice minute: 1-20
- Role automation: Enable/Disable`}
                            </CodeBlock>
                        </div>

                        <div className="border rounded-lg p-4" style={{ borderColor: '#2ee6f7', backgroundColor: 'rgba(46, 230, 247, 0.05)' }}>
                            <h4 className="font-semibold mb-3" style={{ color: '#0891b2' }}>Points System Features</h4>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <Trophy className="h-4 w-4 mr-2" style={{ color: '#2ee6f7' }} />
                                    <span style={{ color: '#0e7490' }}><strong>Daily Rewards:</strong> 50-200 points daily</span>
                                </div>
                                <div className="flex items-center">
                                    <Trophy className="h-4 w-4 mr-2" style={{ color: '#2ee6f7' }} />
                                    <span style={{ color: '#0e7490' }}><strong>Point Trading:</strong> Users can gift points</span>
                                </div>
                                <div className="flex items-center">
                                    <Trophy className="h-4 w-4 mr-2" style={{ color: '#2ee6f7' }} />
                                    <span style={{ color: '#0e7490' }}><strong>Leaderboards:</strong> Server-wide rankings</span>
                                </div>
                                <div className="flex items-center">
                                    <Trophy className="h-4 w-4 mr-2" style={{ color: '#2ee6f7' }} />
                                    <span style={{ color: '#0e7490' }}><strong>Future Ready:</strong> Framework for point shops</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Footer */}
                <div className="text-center mt-8 p-6 rounded-lg shadow-sm" style={{ backgroundColor: '#1f2937' }}>
                    <p className="text-gray-300">
                        🚀 Ready to deploy your VAISH Discord Bot? Follow the steps above and join the AI revolution!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Installation;