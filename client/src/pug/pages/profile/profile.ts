/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
import { profileDom } from '../../../javascript/dom_elements';
import { getUserFromStorage } from '../../../javascript/user';
import { profileRenderer } from './profileRenderer';
import { activityHistory } from '../../components/profile-activity/profile-activity';
import { renderComponents } from '../../components/support/admin/renderComponents.jsx';
import { cameraFunc } from '../../components/webrtc-camera/camera';

export const profile = (): void => {
    const user: object = getUserFromStorage();

    switch (user.type) {
        case 'user':
            profileDom.userNav.classList.add('active');
            profileDom.userContent.classList.add('active');

            profileRenderer(user.type, user);
            activityHistory();
            cameraFunc();
            break;
        case 'admin':
            profileDom.adminNav.classList.add('active');
            profileDom.adminContent.classList.add('active');

            profileRenderer(user.type, user);

            renderComponents();
            break;
        default:
            break;
    }

    // ***** NAVIGATION *****

    profileDom.returnBtn.addEventListener('click', (): void => {
        history.back();
    });

    profileDom.navBtn.forEach(btn => {
        btn.addEventListener('click', (e: Event): void => {
            const self: object = e.currentTarget;
            
            // nav styles
            profileDom.navBtnParents.forEach((el): void => {
                el.classList.remove('active');
            });

            self.parentNode.classList.add('active');

            if (user.type === 'user') {
                profileDom.userPages.forEach((page): void => {
                    page.classList.remove('active');
                });
            } else {
                profileDom.adminPages.forEach((page): void => {
                    page.classList.remove('active');
                });
            }

            switch (self.innerText) {
                case 'My Page':
                    profileDom.myPage.classList.add('active');
                    break;
                case 'My Tickets':
                    profileDom.myTickets.classList.add('active');
                    break;
                // case 'Dashboard':
                //     profileDom.dashboard.classList.add('active');
                //     break;
                // case 'Customers':
                //     profileDom.customers.classList.add('active');
                //     break;
                case 'Support':
                    profileDom.supportPage.classList.add('active');
                    break;
                default:
                    break;
            }
        });
    });
};