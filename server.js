const express = require('express');
const cors = require('cors');
// If you’re on Node 18+ you can delete the next line and use global fetch
const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const app = express();
const PORT = 4000;

// 💡 In dev, just allow everything
app.use(cors()); // adds Access-Control-Allow-Origin: * on ALL responses

// ---- SALES ----
app.get('/api/sales', async (req, res) => {
  try {
    const { user, apikey, df, dt } = req.query;

    const url = new URL('https://gmin.onegrindersguild.com/api.get.sales.php');
    if (user)   url.searchParams.set('user', user);
    if (apikey) url.searchParams.set('apikey', apikey);
    if (df)     url.searchParams.set('df', df);
    if (dt)     url.searchParams.set('dt', dt);

    console.log('Calling SALES upstream:', url.toString());

    const response = await fetch(url.toString());
    const text = await response.text();

    console.log('SALES upstream status:', response.status, 'length:', text.length);

    res.setHeader('Content-Type', 'application/json');
    res.status(response.status).send(text);
  } catch (err) {
    console.error('Proxy error /api/sales:', err);
    res.status(500).json({ error: 'Proxy failed', details: err.message });
  }
});

// ---- USERS ----
app.get('/api/users', async (req, res) => {
  try {
    const { user, apikey, df, dt, search } = req.query;

    const url = new URL('https://gmin.onegrindersguild.com/api.get.user.php');
    if (user)   url.searchParams.set('user', user);
    if (apikey) url.searchParams.set('apikey', apikey);
    if (df)     url.searchParams.set('df', df);
    if (dt)     url.searchParams.set('dt', dt);
    if (search) url.searchParams.set('search', search);

    console.log('Calling USERS upstream:', url.toString());

    const response = await fetch(url.toString());
    const text = await response.text();

    console.log('USERS upstream status:', response.status, 'length:', text.length);

    res.setHeader('Content-Type', 'application/json');
    res.status(response.status).send(text);
  } catch (err) {
    console.error('Proxy error /api/users:', err);
    res.status(500).json({ error: 'Proxy failed', details: err.message });
  }
});

// ---- CODES ----
app.get('/api/codes', async (req, res) => {
  try {
    const { user, apikey, df, dt, search } = req.query;

    const url = new URL('https://gmin.onegrindersguild.com/api.get.codes.php');
    if (user)   url.searchParams.set('user', user);
    if (apikey) url.searchParams.set('apikey', apikey);
    if (df)     url.searchParams.set('df', df);
    if (dt)     url.searchParams.set('dt', dt);
    if (search) url.searchParams.set('search', search);

    console.log('Calling CODES upstream:', url.toString());

    const response = await fetch(url.toString());
    const text = await response.text();

    console.log('CODES upstream status:', response.status, 'length:', text.length);

    // Normalize empty 204/empty body into valid JSON
    const body = text && text.trim() ? text : JSON.stringify({ data: [] });

    res.setHeader('Content-Type', 'application/json');
    res.status(response.status).send(body);
  } catch (err) {
    console.error('Proxy error /api/codes:', err);
    res.status(500).json({ error: 'Proxy failed', details: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Proxy listening at http://localhost:${PORT}`);
});
