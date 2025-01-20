const axios = require('axios');
const { getSiteList, updateStatuses } = require('../utils/siteListManager');
const { sendNotification } = require('./notification');
const config = require('../config.json');

let lastStatuses = {};

const checkStatus = async () => {
  const sites = getSiteList();
  for (const site of sites) {
    try {
      await axios.get(site.url);
      if (lastStatuses[site.id] === false) {
        sendNotification(site, 'Online');
      }
      lastStatuses[site.id] = true;
      updateStatuses(site.id, 'Online');
    } catch (error) {
      if (lastStatuses[site.id] !== false) {
        sendNotification(site, 'Offline');
      }
      lastStatuses[site.id] = false;
      updateStatuses(site.id, 'Offline');
    }
  }
};

const startChecker = () => {
  const checkInterval = Number(config.checkInterval || 10) * 1000;
  setInterval(checkStatus, checkInterval);
};

module.exports = { startChecker };
