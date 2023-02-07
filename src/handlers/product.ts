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
