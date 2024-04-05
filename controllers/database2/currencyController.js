const { WTT_Currency } = require('../../models/database2/wtt_currency');

exports.createCurrency = async (req, res) => {
  try {
    const currency = await WTT_Currency.create(req.body);
    return res.status(201).json(currency);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.getAllCurrencies = async (req, res) => {
  try {
    const currencies = await WTT_Currency.findAll();
    return res.status(200).json(currencies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.getAllCurrencies2 = async (req, res) => {
    try {
      const currencies = await WTT_Currency.findAll();
      return currencies;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server Error' });
    }
  };

exports.getCurrencyById = async (req, res) => {
  try {
    const { id } = req.params;
    const currency = await WTT_Currency.findByPk(id);

    if (!currency) {
      return res.status(404).json({ error: 'Currency not found' });
    }

    return res.status(200).json(currency);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.updateCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    const currency = await WTT_Currency.findByPk(id);

    if (!currency) {
      return res.status(404).json({ error: 'Currency not found' });
    }

    await currency.update(req.body);
    return res.status(200).json(currency);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.deleteCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    const currency = await WTT_Currency.findByPk(id);

    if (!currency) {
      return res.status(404).json({ error: 'Currency not found' });
    }

    await currency.destroy();
    return res.status(204).json(); // No content response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

