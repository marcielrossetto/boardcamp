import express from 'express';

const router = express.Router();

// Exemplo de rota
router.get("/health", (req, res) => {
  res.send("OK");
});

export default router;
