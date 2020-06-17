const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf')
const { version } = require('./package.json');

/**
 * Those files will not be copied from the template folder 
 * when generating a new application from it.
 */
const skipFiles = ["node_modules", "dist", "coverage"];

/**
 * If true, replaces all template files by the current generated app, 
 * and reverts all placeholder replacements on it.
 * This is very useful, because it is not possible to run the template 
 * application. With this feature we can fix errors directly on the 
 * generated app and then propagate them to the template files
 */
const reverse = "true" == `${process.env.UPDATE_TEMPLATES_FROM_GENERATED_SOURCE}`;

/**
 * Replacements for placeholders in different letter cases
 */

//AppName
const friendlyAppName = process.env.FRIENDLY_APPLICATION_NAME;
const friendlyUpperCamelCaseAppName = toUpperCamelCaseName(friendlyAppName);
const friendlyUpperSnakeCaseAppName = toUpperSnakeCase(friendlyAppName);
const friendlyLowerCamelCaseAppName = toLowerCamelCaseName(friendlyAppName);
const friendlyLowerCaseAppName = friendlyLowerCamelCaseAppName.toLowerCase();

//CompanyName
const friendlyCompanyName = process.env.FRIENDLY_COMPANY_NAME;
const friendlyUpperCamelCaseCompanyName = toUpperCamelCaseName(friendlyCompanyName);
const friendlyUpperSnakeCaseCompanyName = toUpperSnakeCase(friendlyCompanyName);
const friendlyLowerCamelCaseCompanyName = toLowerCamelCaseName(friendlyCompanyName);
const friendlyLowerCaseCompanyName = friendlyLowerCamelCaseCompanyName.toLowerCase();

//SonarQube
const shouldUseSonarQube = process.env.SHOULD_USE_SONAR;
const friendlySonarQubeUrl = process.env.FRIENDLY_SONARQUBE_URL;
const friendlySonarQubePort = process.env.FRIENDLY_SONARQUBE_PORT;

const friendlyLowerCaseSonarQubeUrl = friendlySonarQubeUrl.toLowerCase();
const friendlyLowerCaseSonarQubePort = friendlySonarQubePort.toLowerCase();

//Package
const boilerplateProjectVersion = version

/**
 * Register one replacement for each placeholder
 */
let replacements = {
    "\\$\\{APP_NAME\\}": friendlyUpperCamelCaseAppName,
    "\\$\\{AppName\\}": friendlyUpperSnakeCaseAppName,
    "\\$\\{appName\\}": friendlyLowerCamelCaseAppName,
    "\\$\\{appname\\}": friendlyLowerCaseAppName,
    "\\$\\{COMPANY_NAME\\}": friendlyUpperCamelCaseCompanyName,
    "\\$\\{CompanyName\\}": friendlyUpperSnakeCaseCompanyName,
    "\\$\\{companyName\\}": friendlyLowerCamelCaseCompanyName,
    "\\$\\{companyname\\}": friendlyLowerCaseCompanyName,
    "\\$\\{sonarqubeurl\\}": friendlyLowerCaseSonarQubeUrl,
    "\\$\\{sonarqubeport\\}": friendlyLowerCaseSonarQubePort,
    "\\$\\{boilerplateversion\\}": boilerplateProjectVersion,
};

/**
 * If reverse mode is ON, we invert the replacements map,
 * so the values become the keys and vice versa. Regex 
 * escapes are removed as we will replace plain words.
 */
if (reverse) {
    console.log('')
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log('! Reverse mode ON. Be cautious before pushing changes to the repo! !')
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log('')
    const inverseMap = {};
    for (const key in replacements) {
        const value = replacements[key];
        inverseMap[value] = key.replace(/\\/g, "");
    }
    replacements = inverseMap
}

/**
 * Copies the template files and replaces the placeholders
 * in each file name and content
 */
(function generate() {
    console.log("\nCloning template files")
    let templateDir = path.resolve("./template")
    let generatedDir = path.resolve("./generated");
    if (!reverse) {
        rimraf.sync(generatedDir);
        copyFilesAndReplacePlaceholders(templateDir, generatedDir);
        renameFilesRecursively(generatedDir, []);
    } else {
        rimraf.sync(templateDir);
        copyFilesAndReplacePlaceholders(generatedDir, templateDir);
        renameFilesRecursively(templateDir, []);
    }


})()

/**
 * Recursively copies 
 */
function renameFilesRecursively(dir, list) {
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        const originalName = path.join(dir, file);
        const newName = path.join(dir, replacePlaceholders(file));
        if (fs.statSync(originalName).isDirectory()) {
            list = renameFilesRecursively(originalName, list);
            fs.renameSync(originalName, newName, { recursive: true });
        }
        else {
            //Remove Sonar files if necessary
            if (shouldUseSonarQube === 'false' && originalName.includes('analyse.js')) {
                rimraf.sync(originalName);
            } else {
                fs.renameSync(originalName, newName);
                replaceContents(newName);
            }

        }
    });
    return list;
};

/**
 * Copies all files in the given source directory, replacing
 * all placeholders in their names and contents.
 */
function copyFilesAndReplacePlaceholders(sourceFolder, targetFolder) {
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }
    var sourceFiles = fs.readdirSync(sourceFolder);
    sourceFiles.forEach(function (sourceFile) {
        if (skipFiles.indexOf(sourceFile) < 0) {
            const sourceFullName = path.join(sourceFolder, sourceFile);
            if (fs.statSync(sourceFullName).isDirectory()) {
                const targetSubFolder = path.join(targetFolder, sourceFile);
                copyFilesAndReplacePlaceholders(sourceFullName, targetSubFolder);
            }
            else {
                const targetFullName = path.join(targetFolder, sourceFile);
                fs.copyFileSync(sourceFullName, targetFullName);
            }
        }
    });
}

/**
 * Changes the content of a target file, replacing its placeholders.
 */
function replaceContents(file) {
    let content = fs.readFileSync(file).toString('utf8');
    content = replacePlaceholders(content);
    fs.writeFileSync(file, content);
}

/**
 * Replaces all placeholders in a given string
 */
function replacePlaceholders(str) {
    for (const key in replacements) {
        str = str.replace(eval(`/${key}/g`), replacements[key]);
    }
    return str;
}

/**
 * Given "A target string", returns "ATargetString"
 */
function toUpperCamelCaseName(str) {
    const camelCase = str.replace(/\W+(.)/g, function (match, chr) {
        return chr.toUpperCase();
    });
    return camelCase[0].toUpperCase() + camelCase.substring(1);
}

/**
 * Given "A target string", returns "aTargetString"
 */
function toLowerCamelCaseName(str) {
    const camelCase = toUpperCamelCaseName(str);
    return camelCase[0].toLowerCase() + camelCase.substring(1);
}

/**
 * Given "A target string", returns "A_TARGET_STRING"
 */
function toUpperSnakeCase(str) {
    return str.trim().split(/\s+/).join('_').toUpperCase();
}

