import { createSiteMenuTemplate } from "./view/site-menu-view";
import { createSiteFiltersTemplate } from "./site-filters-view";
import { createSiteBoardTemplate } from "./view/site-board-view";
import { createNewPointTemplate } from "./view/new-point";
import { RenderPosition, renderTemplate } from "./render";



const siteHeaderElement = document.querySelector('.page-header');
const siteDivElement = siteHeaderElement.querySelector('.trip-controls__navigation');



renderTemplate(siteDivElement, createSiteMenuTemplate(), RenderPosition.BEFOREBEGIN);
renderTemplate(siteDivElement, createSiteFiltersTemplate(), RenderPosition.BEFOREEND );


const siteMainElement = document.querySelector('.page-main')
const siteSectElement = siteMainElement.querySelector('.trip-events')
renderTemplate(siteSectElement, createSiteBoardTemplate(), RenderPosition.BEFOREBEGIN);
renderTemplate(siteSectElement, createNewPointTemplate(), RenderPosition.BEFOREEND)