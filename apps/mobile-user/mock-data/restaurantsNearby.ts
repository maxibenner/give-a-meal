export const restaurants: RestaurantInterface[] = [
  {
    id: "sdf324234ljsdf",
    title: "Livite",
    address: "1644 Beacon St, Brookline",
    donations: [
      {
        id: "1",
        title: "Sandwich of Choice",
        description:
          "Includes lettuce, tomatoes, peanut sauce, and an assortment of different spices.",
        donatedBy: "Rachel",
      },
      {
        id: "2",
        title: "Sandwich of Choice",
        description:
          "Includes lettuce, tomatoes, peanut sauce, and an assortment of different spices.",
        donatedBy: "Rachel",
      },
      {
        id: "3",
        title: "Sandwich of Choice",
        description:
          "Includes lettuce, tomatoes, peanut sauce, and an assortment of different spices.",
        donatedBy: "Rachel",
      },
    ],
  },
  {
    id: "sdf324sdf",
    title: "Mamaleh's Delicatessen",
    address: "44 Church St, Brookline",
    donations: [
      {
        id: "4",
        title: "Sandwich of Choice",
        description:
          "Includes lettuce, tomatoes, peanut sauce, and an assortment of different spices.",
        donatedBy: "Rachel",
      },
      {
        id: "5",
        title: "Sandwich of Choice",
        description:
          "Includes lettuce, tomatoes, peanut sauce, and an assortment of different spices.",
        donatedBy: "Rachel",
      },
      {
        id: "6",
        title: "Sandwich of Choice",
        description:
          "Includes lettuce, tomatoes, peanut sauce, and an assortment of different spices.",
        donatedBy: "Rachel",
      },
      {
        id: "7",
        title: "Sandwich of Choice",
        description:
          "Includes lettuce, tomatoes, peanut sauce, and an assortment of different spices.",
        donatedBy: "Rachel",
      },
      {
        id: "8",
        title: "Sandwich of Choice",
        description:
          "Includes lettuce, tomatoes, peanut sauce, and an assortment of different spices.",
        donatedBy: "Rachel",
      },
      {
        id: "9",
        title: "Sandwich of Choice",
        description:
          "Includes lettuce, tomatoes, peanut sauce, and an assortment of different spices.",
        donatedBy: "Rachel",
      },
      {
        id: "10",
        title: "Sandwich of Choice",
        description:
          "Includes lettuce, tomatoes, peanut sauce, and an assortment of different spices.",
        donatedBy: "Rachel",
      },
    ],
  },
];

interface RestaurantInterface {
  id: string;
  title: string;
  address: string;
  donations: {
    title: string;
    description: string;
    donatedBy: string;
    id: string;
  }[];
}
[];
