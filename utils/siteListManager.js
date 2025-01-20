const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Use UUID for generating unique IDs

const siteListConfig = path.join(__dirname, "../siteList.json");
const mainConfig = path.join(__dirname, "../config.json");

const getSiteList = () => {
  if (!fs.existsSync(siteListConfig)) {
    fs.writeFileSync(
      siteListConfig,
      JSON.stringify({ sites: [], statuses: {} })
    );
  }
  const configData = JSON.parse(fs.readFileSync(siteListConfig));
  return configData.sites;
};

const getIntervalConfig = () => {
  const configData = JSON.parse(fs.readFileSync(mainConfig));
  return configData.checkInterval;
};

const addSite = (url) => {
  const configData = JSON.parse(fs.readFileSync(siteListConfig));
  const siteExists = configData.sites.some((site) => site.url === url);

  if (!siteExists) {
    configData.sites.push({ id: uuidv4(), url });
    fs.writeFileSync(siteListConfig, JSON.stringify(configData, null, 2));
  }
};

const editSite = (id, newUrl) => {
  const configData = JSON.parse(fs.readFileSync(siteListConfig));
  const site = configData.sites.find((site) => site.id === id);

  if (site) {
    configData.sites = configData.sites.filter((site) => site.id !== id);
    configData.sites.push({ id, url: newUrl });
    fs.writeFileSync(siteListConfig, JSON.stringify(configData, null, 2));
  }
};

const updateStatuses = (siteId, status) => {
  const configData = JSON.parse(fs.readFileSync(siteListConfig));
  configData.statuses[siteId] = status;
  fs.writeFileSync(siteListConfig, JSON.stringify(configData, null, 2));
};

const removeSite = (id) => {
  const configData = JSON.parse(fs.readFileSync(siteListConfig));
  const site = configData.sites.find((site) => site.id === id);

  if (site) {
    // Remove the site and its status
    configData.sites = configData.sites.filter((site) => site.id !== id);
    delete configData.statuses[id];

    fs.writeFileSync(siteListConfig, JSON.stringify(configData, null, 2));
  }
};

// Update global checkInterval
const updateCheckInterval = (newInterval) => {
  const configData = JSON.parse(fs.readFileSync(siteListConfig));
  configData.checkInterval = newInterval;
  fs.writeFileSync(siteListConfig, JSON.stringify(configData, null, 2));
};

module.exports = {
  getSiteList,
  addSite,
  editSite,
  removeSite,
  updateStatuses,
  updateCheckInterval,
  getIntervalConfig,
};
