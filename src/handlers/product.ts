import prisma from "../db";

/**
 * Get all
 */
export const getProducts = async (req, res) => {
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

export const getOneProduct = async (req, res) => {
  const productId = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      belongsToId: req.user.id,
    },
  });

  if (!product) {
    res.status(404);
    res.json({ msg: "Not exists!" });
    return;
  }

  console.log(productId, product);

  res.json({ data: product });
};

/**
 * Create a product
 */
export const createProduct = async (req, res) => {
  const { id } = req.user;
  const { name } = req.body;

  const product = prisma.product.create({
    data: {
      name,
      belongsToId: id,
    },
  });

  res.json({ data: product });
};

/**
 * Update a product
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
 * Delete a product
 */

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const deleted = prisma.product.delete({
    where: {
      id_belongsToId: {
        id,
        belongsToId: userId,
      },
    },
  });

  res.json({ data: deleted });
};
