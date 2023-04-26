import MenuItem from './entities/menu-item.entity';

export class MenuItemsService {

    async getMenuItems(): Promise < MenuItem[] > {
        const menuItems = await MenuItem.findAll({
            order: [
                ['id', 'ASC']
            ],
        });

        const menuMap = new Map < number,
            MenuItem > ();
        const rootMenuItems: MenuItem[] = [];

        menuItems.forEach((menuItem) => {
            menuMap.set(menuItem.id, menuItem);

            if (!menuItem.parentId) {
                rootMenuItems.push(menuItem);
            } else {
                const parentMenuItem = menuMap.get(menuItem.parentId);

                if (parentMenuItem) {
                    if (!parentMenuItem.children) {
                        parentMenuItem.children = [];
                    }

                    parentMenuItem.children.push(menuItem);
                }
            }
        });

        return rootMenuItems;
    }
}