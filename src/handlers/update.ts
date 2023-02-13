import prisma from "../db";

/**
 * Get all
 */
export const getUpdates = async (req, res) => {
  const { id: userId } = req.user;

  const products = await prisma.product.findMany({
    where: {
      belongsToId: userId,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((acc, product) => {
    return [...acc, ...product.updates];
  }, []);

  res.json({ data: updates });
};

/**
 * Get One
 */

export const getOneUpdate = async (req, res) => {
  const { id } = req.params;

  const update = await prisma.update.findUnique({
    where: {
      id,
    },
  });

  if (!update) {
    res.status(404);
    res.json({ msg: "Not exists!" });
    return;
  }

  res.json({ data: update });
};

/**
 * Create one
 */
export const createUpdate = async (req, res) => {
  const { title, body, productId } = req.body;

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    res.status(401);
    res.json({ message: "Invalid data" });

    return;
  }

  const update = await prisma.update.create({
    data: {
      title,
      body,
      productId,
    },
  });

  res.json({ data: update });
};

/**
 * Update one
 */
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updated = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  res.json({
    data: updated,
  });
};

/**
 * Delete one
 */

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const deleted = prisma.update.delete({
    where: {
      id,
    },
  });

  res.json({ data: deleted });
};