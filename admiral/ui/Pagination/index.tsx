import { createUltimatePagination, ITEM_TYPES } from 'react-ultimate-pagination'
import cln from 'classnames'
import React from 'react'

/*

<ul class="pagination m-0 ms-auto">
                      <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                          <!-- Download SVG icon from http://tabler-icons.io/i/chevron-left -->
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="15 6 9 12 15 18"></polyline></svg>
                          prev
                        </a>
                      </li>
                      <li class="page-item"><a class="page-link" href="#">1</a></li>
                      <li class="page-item active"><a class="page-link" href="#">2</a></li>
                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                      <li class="page-item"><a class="page-link" href="#">4</a></li>
                      <li class="page-item"><a class="page-link" href="#">5</a></li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          next <!-- Download SVG icon from http://tabler-icons.io/i/chevron-right -->
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="9 6 15 12 9 18"></polyline></svg>
                        </a>
                      </li>
                    </ul>
                    */

export const Paginator = createUltimatePagination({
    WrapperComponent: ({ children }) => <ul className="pagination m-0 ms-auto">{children}</ul>,
    itemTypeToComponent: {
        [ITEM_TYPES.PAGE]: ({ value, isActive, onClick }) => (
            <li className={cln('page-item', { active: isActive })}>
                <a className="page-link" href="#" onClick={(e) => (e.preventDefault(), onClick())}>
                    {value}
                </a>
            </li>
        ),
        [ITEM_TYPES.ELLIPSIS]: ({ value, isActive, onClick }) => null,
        [ITEM_TYPES.FIRST_PAGE_LINK]: ({ isActive, onClick }) => null,
        [ITEM_TYPES.PREVIOUS_PAGE_LINK]: ({ value, isActive, onClick }) => null,
        [ITEM_TYPES.NEXT_PAGE_LINK]: ({ value, isActive, onClick }) => null,
        [ITEM_TYPES.LAST_PAGE_LINK]: ({ value, isActive, onClick }) => null,
    },
})
