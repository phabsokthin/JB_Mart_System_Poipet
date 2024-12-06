import express from 'express';

const router = express.Router();

router.get('/api', (req, res) => {
    res.send('Hello from the Routerewww!');
});


export default router;
