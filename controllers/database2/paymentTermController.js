const { WTT_PaymentTerm } = require('../../models/database2/wtt_paymentTerm');

exports.createPaymentTerm = async (req, res) => {
  try {
    const paymentTerm = await WTT_PaymentTerm.create(req.body);
    return res.status(201).json(paymentTerm);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.getAllPaymentTerms = async (req, res) => {
  try {
    const paymentTerms = await WTT_PaymentTerm.findAll();
    return res.status(200).json(paymentTerms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.getAllPaymentTerms2 = async (req, res) => {
  try {
    const paymentTerms = await WTT_PaymentTerm.findAll();
    return paymentTerms;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.getPaymentTermById = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentTerm = await WTT_PaymentTerm.findByPk(id);

    if (!paymentTerm) {
      return res.status(404).json({ error: 'Payment Term not found' });
    }

    return res.status(200).json(paymentTerm);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.updatePaymentTerm = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentTerm = await WTT_PaymentTerm.findByPk(id);

    if (!paymentTerm) {
      return res.status(404).json({ error: 'Payment Term not found' });
    }

    await paymentTerm.update(req.body);
    return res.status(200).json(paymentTerm);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.deletePaymentTerm = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentTerm = await WTT_PaymentTerm.findByPk(id);

    if (!paymentTerm) {
      return res.status(404).json({ error: 'Payment Term not found' });
    }

    await paymentTerm.destroy();
    return res.status(204).json(); // No content response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

