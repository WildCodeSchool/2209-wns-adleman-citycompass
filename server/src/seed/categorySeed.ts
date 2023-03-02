import Category from "../entity/Category";
import datasource from "../db";


async function reset(): Promise<void> {
  await datasource.initialize();
  await datasource.getRepository(Category).delete({});
  await datasource.getRepository(Category).save([
    {
        id: 1,
        name: 'Bars',
        picto: 'https://zupimages.net/up/23/09/cyg3.png'
    },
    {
        id: 2,
        name: 'Cinema',
        picto: 'https://zupimages.net/up/23/09/r5oc.png'
    },
    {
        id: 3,
        name: 'Hotel',
        picto: 'Barrhttps://zupimages.net/up/23/09/r4mz.pngows'
    },
    {
        id: 4,
        name: 'Library',
        picto: 'https://zupimages.net/up/23/09/mhso.png'
    },
    {
        id: 5,
        name: 'Museum',
        picto: 'https://zupimages.net/up/23/09/hp6v.png'
    },
    {
        id: 6,
        name: 'Park',
        picto: 'https://zupimages.net/up/23/09/nhcc.png'
    },
    {
        id: 7,
        name: 'Restaurant',
        picto: 'https://zupimages.net/up/23/09/9k1h.png'
    },
    {
        id: 8,
        name: 'Sport',
        picto: 'https://zupimages.net/up/23/09/rhv6.png'
    },
    {
        id: 9,
        name: 'Travel',
        picto: 'https://zupimages.net/up/23/09/6vet.png'
    },
  ]);
  await datasource.destroy();
  console.log("done !");
}

reset().catch(console.error);