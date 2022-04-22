export const reservedMeals: MealType[] = [
  {
    id: "jk1h23",
    title: "Sandwich of Choice",
    businessName: "Mamaleh’s Delicatessen",
    address: "1644 Beacon St, Brookline",
  },
  {
    id: "jk1423",
    title: "Good Salad",
    businessName: "Livite",
    address: "20 Beacon St, Brookline",
  },
  // {
  //   id: "gk1423",
  //   title: "Good Salad",
  //   businessName: "Livite",
  //   address: "20 Beacon St, Brookline",
  // },
  // {
  //   id: "jg1423",
  //   title: "Good Salad",
  //   businessName: "Livite",
  //   address: "20 Beacon St, Brookline",
  // },
];

export type MealType = {
  id: string;
  title: string;
  businessName: string;
  address: string;
}
