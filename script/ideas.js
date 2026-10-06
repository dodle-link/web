'use strict';

const trendEditions = {
  en: 'English',
  ja: 'Japanese',
  zh: 'Chinese',
  th: 'Thai',
  ko: 'Korean',
  fr: 'French',
  de: 'German'
};

const trendList = document.querySelector('#trends-list');
const trendStatus = document.querySelector('#trends-status');
const editionFilter = document.querySelector('#edition-filter');
const refreshButton = document.querySelector('#refresh-trends');
const themeToggle = document.querySelector('.theme-toggle');
let editionResults = {};

function setTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  document.body.classList.toggle('dark', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  try {
    localStorage.setItem('dodle-theme', isDark ? 'dark' : 'light');
  } catch {}
}

setTheme(document.documentElement.classList.contains('dark'));
themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

function getPreviousUtcDate() {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() - 1);
  return {
    year: date.getUTCFullYear(),
    month: String(date.getUTCMonth() + 1).padStart(2, '0'),
    day: String(date.getUTCDate()).padStart(2, '0'),
    value: date
  };
}

function isUsefulArticle(article) {
  return article.article && article.article !== 'Main_Page' && !article.article.includes(':');
}

async function loadEdition(code, date) {
  const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/${code}.wikipedia/all-access/${date.year}/${date.month}/${date.day}`;
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Wikipedia ${code} returned ${response.status}`);

  const data = await response.json();
  const articles = data.items?.[0]?.articles;
  if (!Array.isArray(articles)) throw new Error(`Wikipedia ${code} returned no pageview data`);
  return articles.filter(isUsefulArticle).map(article => ({ ...article, code }));
}

function createTopicRow(article, rank) {
  const item = document.createElement('li');
  item.className = 'ideas-item';

  const rankLabel = document.createElement('span');
  rankLabel.className = 'ideas-rank';
  rankLabel.textContent = String(rank).padStart(2, '0');

  const topic = document.createElement('div');
  topic.className = 'ideas-topic';
  const searchLink = document.createElement('a');
  const title = article.article.replaceAll('_', ' ');
  searchLink.href = `https://www.google.com/search?q=${encodeURIComponent(title)}`;
  searchLink.target = '_blank';
  searchLink.rel = 'noopener noreferrer';
  searchLink.textContent = title;
  topic.append(searchLink);

  const meta = document.createElement('span');
  meta.className = 'ideas-meta';
  meta.textContent = `${trendEditions[article.code]} edition · ranked #${article.rank}`;
  topic.append(meta);

  const detail = document.createElement('span');
  detail.className = 'ideas-detail';
  const views = document.createElement('span');
  views.textContent = `${new Intl.NumberFormat().format(article.views)} views`;
  const sourceLink = document.createElement('a');
  sourceLink.href = `https://${article.code}.wikipedia.org/wiki/${encodeURIComponent(article.article)}`;
  sourceLink.target = '_blank';
  sourceLink.rel = 'noopener noreferrer';
  sourceLink.textContent = 'Wikipedia';
  detail.append(views, sourceLink);

  item.append(rankLabel, topic, detail);
  return item;
}

function getWorldwideTopics() {
  return Object.values(editionResults)
    .flat()
    .sort((first, second) => first.rank - second.rank || first.code.localeCompare(second.code));
}

function renderTopics() {
  const selectedEdition = editionFilter.value;
  const topics = selectedEdition === 'all'
    ? getWorldwideTopics()
    : (editionResults[selectedEdition] || []);

  trendList.replaceChildren();
  if (topics.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'ideas-empty';
    empty.textContent = 'No pageview data is available for this edition yet.';
    trendList.append(empty);
    return;
  }

  topics.slice(0, 40).forEach((article, index) => {
    trendList.append(createTopicRow(article, index + 1));
  });
}

async function refreshTopics() {
  refreshButton.disabled = true;
  refreshButton.classList.add('is-loading');
  trendStatus.textContent = 'Loading daily topics…';
  const date = getPreviousUtcDate();
  const results = await Promise.allSettled(
    Object.keys(trendEditions).map(code => loadEdition(code, date))
  );

  editionResults = {};
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      editionResults[Object.keys(trendEditions)[index]] = result.value;
    }
  });

  const loadedCount = Object.keys(editionResults).length;
  if (loadedCount === 0) {
    trendStatus.textContent = 'Could not load pageview data. Check your connection and try again.';
  } else {
    const dateLabel = new Intl.DateTimeFormat(undefined, {
      dateStyle: 'long',
      timeZone: 'UTC'
    }).format(date.value);
    const partialNote = loadedCount < Object.keys(trendEditions).length
      ? ` · ${loadedCount} of ${Object.keys(trendEditions).length} editions loaded`
      : '';
    trendStatus.textContent = `Pageviews for ${dateLabel}${partialNote}`;
  }

  renderTopics();
  refreshButton.disabled = false;
  refreshButton.classList.remove('is-loading');
}

editionFilter.addEventListener('change', renderTopics);
refreshButton.addEventListener('click', refreshTopics);
refreshTopics();