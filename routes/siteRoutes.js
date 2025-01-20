const express = require("express");
const fs = require("fs");
const path = require("path");
const {
  getSiteList,
  addSite,
  removeSite,
  editSite,
  updateCheckInterval,
  getIntervalConfig,
} = require("../utils/siteListManager");

const router = express.Router();

// Home Page - Show the site list
router.get("/", (req, res) => {
  const sites = getSiteList();
  const checkInterval = getIntervalConfig();
  res.render("index", { sites, checkInterval });
});

// Add a new site (GET form)
router.get("/add", (req, res) => {
  res.render("add-site");
});

// API to get site statuses
router.get("/api/statuses", (req, res) => {
  const config = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../siteList.json"))
  );
  res.json(config.statuses);
});

// Add a new site (POST action)
router.post("/add", (req, res) => {
  const { url } = req.body;
  addSite(url);
  res.redirect("/");
});

// Render the edit form for a site
router.get("/edit/:id", (req, res) => {
  const siteToEdit = getSiteList().find((site) => site.id === req.params.id);
  if (!siteToEdit) return res.status(404).send("Site not found");
  res.render("edit-site", { site: siteToEdit });
});

// Edit a site (POST action)
router.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { newSite } = req.body;
  editSite(id, newSite);
  res.redirect("/");
});

// Remove a site
router.post("/remove/:id", (req, res) => {
  removeSite(req.params.id);
  res.redirect("/");
});

// Update global checkInterval
router.post("/update-interval", (req, res) => {
  const { checkInterval } = req.body;
  updateCheckInterval(checkInterval);
  res.redirect("/");
});

module.exports = router;
