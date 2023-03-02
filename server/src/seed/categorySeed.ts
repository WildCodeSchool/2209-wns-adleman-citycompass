import Category from "../entity/Category";
import datasource from "../db";


export default async function createCategory(): Promise<void> {
  await datasource.getRepository(Category).save([
    {
        name: 'Bar',
        picto: 'https://zupimages.net/up/23/09/cyg3.png'
    },
    {
        name: 'Cinema',
        picto: 'https://zupimages.net/up/23/09/r5oc.png'
    },
    {
        name: 'Hotel',
        picto: 'Barrhttps://zupimages.net/up/23/09/r4mz.pngows'
    },
    {
        name: 'Library',
        picto: 'https://zupimages.net/up/23/09/mhso.png'
    },
    {
        name: 'Monument',
        picto: 'https://zupimages.net/up/23/09/hp6v.png'
    },
    {
        name: 'Park',
        picto: 'https://zupimages.net/up/23/09/nhcc.png'
    },
    {
        name: 'Restaurant',
        picto: 'https://zupimages.net/up/23/09/9k1h.png'
    },
    {
        name: 'Sport',
        picto: 'https://zupimages.net/up/23/09/rhv6.png'
    },
    {
        name: 'Travel',
        picto: 'https://zupimages.net/up/23/09/6vet.png'
    },
  ]);
}

createCategory().catch(console.error);