import express from 'express';
import Marketing from '../models/Marketing.js';

const router = express.Router();

// Get marketing config
router.get('/', async (req, res) => {
  try {
    let config = await Marketing.findOne({ configId: 'global' });
    if (!config) {
      config = new Marketing({ configId: 'global' });
      await config.save();
    }
    res.json(config);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update marketing config
router.put('/', async (req, res) => {
  try {
    const { activeCampaign, activePromo, activeDiscount } = req.body;
    let config = await Marketing.findOne({ configId: 'global' });
    
    if (!config) {
      config = new Marketing({ configId: 'global' });
    }

    if (activeCampaign !== undefined) config.activeCampaign = activeCampaign;
    if (activePromo !== undefined) config.activePromo = activePromo;
    if (activeDiscount !== undefined) config.activeDiscount = activeDiscount;

    await config.save();
    res.json(config);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
