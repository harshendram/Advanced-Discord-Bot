const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

/**
 * 🚀 Pure Code Zip Generator for VAISH Discord Bot
 * 
 * This script creates a zip file containing only the essential bot code,
 * excluding documentation, images, and other non-code files.
 * 
 * Usage:
 *   npm run build-zip
 *   OR
 *   node generate-code-zip.js
 * 
 * Output: discord-bot-pure-code.zip (ready for distribution)
 */

// Configuration for what to include/exclude
const INCLUDE_FILES = [
    'index.js',
    'deploy-commands.js',
    'package.json',
    '.env.example',
    'setup.bat'
];

const INCLUDE_DIRECTORIES = [
    'commands',
    'events', 
    'models',
    'utils'
];

const EXCLUDE_PATTERNS = [
    '.git',
    '.github',
    'node_modules',
    'screenshots',
    '*.md',
    'LICENSE',
    'CODE_OF_CONDUCT.md',
    'CONTRIBUTING.md',
    'DOCUMENTATION.md',
    'README.md',
    '*.log',
    '.env',
    'discord-bot-pure-code.zip'
];

async function createCodeZip() {
    console.log('🚀 Creating pure code zip file...');
    
    // Create a file to stream archive data to
    const output = fs.createWriteStream('discord-bot-pure-code.zip');
    const archive = archiver('zip', {
        zlib: { level: 9 } // Maximum compression
    });

    // Listen for all archive data to be written
    output.on('close', function() {
        console.log('✅ Zip file created successfully!');
        console.log(`📦 Total bytes: ${archive.pointer()}`);
        console.log('📁 File: discord-bot-pure-code.zip');
        console.log('\n🎯 Contents:');
        console.log('  ├── Core bot files (index.js, deploy-commands.js)');
        console.log('  ├── Package configuration (package.json, .env.example)');
        console.log('  ├── Commands directory (all bot commands)');
        console.log('  ├── Events directory (bot event handlers)');
        console.log('  ├── Models directory (database schemas)');
        console.log('  ├── Utils directory (utility functions)');
        console.log('  └── Setup script (setup.bat)');
        console.log('\n💡 This zip contains only the essential code files needed to run the bot.');
    });

    // Good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
            console.warn('Warning:', err);
        } else {
            throw err;
        }
    });

    // Good practice to catch this error explicitly
    archive.on('error', function(err) {
        throw err;
    });

    // Pipe archive data to the file
    archive.pipe(output);

    // Add individual files
    for (const file of INCLUDE_FILES) {
        if (fs.existsSync(file)) {
            archive.file(file, { name: file });
            console.log(`✓ Added file: ${file}`);
        } else {
            console.log(`⚠️  File not found: ${file}`);
        }
    }

    // Add directories
    for (const dir of INCLUDE_DIRECTORIES) {
        if (fs.existsSync(dir)) {
            archive.directory(dir, dir);
            console.log(`✓ Added directory: ${dir}`);
        } else {
            console.log(`⚠️  Directory not found: ${dir}`);
        }
    }

    // Finalize the archive (ie we are done appending files but streams have to finish yet)
    await archive.finalize();
}

// Function to check if file should be excluded
function shouldExclude(filePath) {
    const fileName = path.basename(filePath);
    
    return EXCLUDE_PATTERNS.some(pattern => {
        if (pattern.includes('*')) {
            // Handle wildcard patterns
            const regex = new RegExp(pattern.replace(/\*/g, '.*'));
            return regex.test(fileName);
        }
        return fileName === pattern || filePath.includes(pattern);
    });
}

// Main execution
if (require.main === module) {
    createCodeZip().catch(console.error);
}

module.exports = { createCodeZip };