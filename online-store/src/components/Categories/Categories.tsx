import React from 'react';
import { ICategoriesContext } from '../../types/types';

const Categories = (props: ICategoriesContext) => {
    const [categoryState, setCategoryState] = React.useState(props.category);

    const selectCategory = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const target = e.target as HTMLLIElement;
        const category = target.dataset.category as string;
        localStorage.setItem('category', category);
        props.applyCategory(category);
        setCategoryState(category);
    };

    return (
        <ul className="header__categories">
            <li
                className={`categories__item${categoryState === 'all' ? ' categories__item_active' : ''}`}
                onClick={selectCategory}
                data-category="all"
            >
                SEE ALL
            </li>
            <li
                className={`categories__item${categoryState === 'shirts' ? ' categories__item_active' : ''}`}
                onClick={selectCategory}
                data-category="shirts"
            >
                SHIRTS
            </li>
            <li
                className={`categories__item${categoryState === 'dresses' ? ' categories__item_active' : ''}`}
                onClick={selectCategory}
                data-category="dresses"
            >
                DRESSES
            </li>
            <li
                className={`categories__item${categoryState === 'pants' ? ' categories__item_active' : ''}`}
                onClick={selectCategory}
                data-category="pants"
            >
                PANTS
            </li>
        </ul>
    );
};

export default Categories;
