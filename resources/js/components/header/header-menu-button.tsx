// import { useContext, useEffect, useRef, useState } from 'react';

import IconVerticalEllipsis from '../icons/icon-vertical-ellipsis';

export default function HeaderMenuButton() {
    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    // const buttonRef = useRef(null);
    // const menuRef = useRef(null);

    // const { boards } = useContext(BoardStateContext);

    // useEffect(() => {
    //     function handleClickOutside(event) {
    //         if (
    //             menuRef.current &&
    //             !menuRef.current.contains(event.target) &&
    //             buttonRef.current &&
    //             !buttonRef.current.contains(event.target)
    //         ) {
    //             setIsMenuOpen(false);
    //         }
    //     }

    //     document.addEventListener('click', handleClickOutside);

    //     return () => {
    //         document.removeEventListener('click', handleClickOutside);
    //     };
    // }, []);

    return (
        <div className="relative">
            <button className="flex cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent px-[0.8rem] py-[1rem] transition-[var(--transition)] hover:bg-[rgba(99,95,199,0.3)] focus-visible:bg-[rgba(99,95,199,0.3)]">
                <IconVerticalEllipsis className="text-muted" />
            </button>

            {/* <ul
                ref={menuRef}
                role="menu"
                id="board-options-menu"
                className={`${classes.dropdownMenu} ${isMenuOpen ? classes.open : ''} `}
            >
                <li className={classes.menuItem}>
                    <button
                        className={classes.menuBtn}
                        type="button"
                        onClick={() => {
                            onOpenEdit();
                            setIsMenuOpen(false);
                        }}
                    >
                        Edit Board
                    </button>
                </li>
                <li className={`${classes.menuItem} ${classes.danger}`}>
                    <button
                        className={classes.menuBtn}
                        type="button"
                        onClick={() => {
                            onOpenDelete();
                            setIsMenuOpen(false);
                        }}
                    >
                        Delete Board
                    </button>
                </li>
            </ul> */}
        </div>
    );
}
