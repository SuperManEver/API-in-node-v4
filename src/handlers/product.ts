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
