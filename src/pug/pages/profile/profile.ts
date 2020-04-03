import { profileDom } from '../../../javascript/dom_elements';
import { getUserFromStorage } from '../../../javascript/user';
import { profileRenderer } from './profileRenderer';
import { activityHistory } from '../../components/profile-activity/profile-activity';

export const profile = (): void => {

    const user: object = getUserFromStorage();

    switch (user.type) {
        case 'user':
            profileDom.userNav.classList.add('active');
            profileDom.userContent.classList.add('active');

            profileRenderer(user.type, user);
            activityHistory();
            break;
        case 'admin':
            profileDom.adminNav.classList.add('active');
            profileDom.adminContent.classList.add('active');

            profileRenderer(user.type, user);
            break;
        default:
            break;
    }

    // ***** NAVIGATION *****

    profileDom.returnBtn.addEventListener('click', (): void => {
        history.back()
    })

    profileDom.navBtn.forEach(btn => {
        btn.addEventListener('click', (e: Event): void => {
            const self: object = e.currentTarget;
            
            profileDom.navBtnParents.forEach((btn): void => {
                btn.classList.remove('active');
            })

            self.parentNode.classList.add('active');

            profileDom.userPages.forEach((page): void => {
                page.classList.remove('active');
            })

            switch (self.innerText) {
                case 'My Page':
                    profileDom.myPage.classList.add('active');
                    break;
                case 'My Tickets':
                    profileDom.myTickets.classList.add('active');
                    break;
                case 'Support':
                    profileDom.support.classList.add('active');
                    break;
                case 'Customers':
                    
                    break;
                case 'Bookings':
                    
                    break;
                case 'Chats':
                    
                    break;
                default:
                    break;
            }
        })
    })
}