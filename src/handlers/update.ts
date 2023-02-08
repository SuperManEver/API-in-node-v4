import prisma from "../db";

/**
 * Get all
 */
export const getUpdates = async (req, res) => {
  //   prisma.update.findMany();

  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({
    data: user.products,
  });
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
export const createProduct = async (req, res) => {
  const { id } = req.user;
  const { name } = req.body;

  const product = await prisma.product.create({
    data: {
      name,
      belongsToId: id,
    },
  });

  res.json({ data: product });
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
