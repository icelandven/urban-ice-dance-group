import {animate, state, style, transition, trigger, keyframes, query, stagger, AnimationTriggerMetadata, group} from '@angular/animations';

export function routerTransition(): AnimationTriggerMetadata {
    return slideToLeft(); // slideToTop
}

export function LoginRouterTransition(): AnimationTriggerMetadata {
    return slideToTop(); // slideToTop
}

export function fadeInOut(): AnimationTriggerMetadata {
    return trigger('fadeInOut', [
        transition(':enter', [   // :enter is alias to 'void => *'
            style({opacity: 0}),
            animate(500, style({opacity: 1}))
        ]),
        transition(':leave', [   // :leave is alias to '* => void'
            animate(500, style({opacity: 0}))
        ])
    ]);
}

export function sidebarAnim(name): void {
    trigger('slideInOut', [
    state('in', style({
      transform: 'translate3d(20%, 0, 0)'
    })),
    state('out', style({
      transform: 'translate3d(100%, 0, 0)'
    })),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ]);
}

export function slideToRight(): AnimationTriggerMetadata {
    return trigger('slideToRight', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ])
    ]);
}

export function slideToLeft(): AnimationTriggerMetadata {
    return trigger('routerTransition', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ])
    ]);
}

export function slideToBottom(): AnimationTriggerMetadata {
    return trigger('slideToBottom', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateY(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateY(100%)' }))
        ])
    ]);
}

export function slideToTop(): AnimationTriggerMetadata {
    return trigger('slideToTop', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateY(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateY(-100%)' }))
        ])
    ]);
}

export function  slideInOutAnimationSideBar(): AnimationTriggerMetadata {
  return trigger('slideInOutAnimationSideBar', [

    // end state styles for route container (host)
    state('in', style({
      // the view covers the whole screen with a semi tranparent background
      left: 60,
      width: 60,
      marginLeft: -60,
    })),
    state('out', style({
      // the view covers the whole screen with a semi tranparent background
      left: 235,
      width: 235,
      marginLeft: -235,
    })),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ]);
}

export const slideInOutAnimationContent =
  trigger('slideInOutAnimationContent', [

    // end state styles for route container (host)
    state('in', style({
      // the view covers the whole screen with a semi tranparent background
      left: 60,
      width: 60,
      marginLeft: -60,
    })),
    state('out', style({
      // the view covers the whole screen with a semi tranparent background
      left: 235,
      width: 235,
      marginLeft: -235,
    })),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ]);


export const SlideInOutAnimation = [
    trigger('slideInOut', [
        state('in', style({
            'max-height': '500px', opacity: '1', visibility: 'visible'
        })),
        state('out', style({
            'max-height': '0px', opacity: '0', visibility: 'hidden'
        })),
        transition('in => out', [group([
                animate('400ms ease-in-out', style({
                    opacity: '0'
                })),
                animate('600ms ease-in-out', style({
                    'max-height': '0px'
                })),
                animate('700ms ease-in-out', style({
                    visibility: 'hidden'
                }))
            ]
        )]),
        transition('out => in', [group([
                animate('1ms ease-in-out', style({
                    visibility: 'visible'
                })),
                animate('600ms ease-in-out', style({
                    'max-height': '500px'
                })),
                animate('800ms ease-in-out', style({
                    opacity: '1'
                }))
            ]
        )])
    ]),
];



