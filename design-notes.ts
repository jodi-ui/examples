// this is to be defined in separate module and imported here
interface UpdateListActionCreator {
    ():  PromiseLike | Promise
}

// we embrace a power of typescript here
// we can pass here an object (like namespace) containing all existing action creators, but interface will define only what we need here
// it will be both easy to use and easy to test
interface ActionCreators {
    updateList: UpdateListActionCreator // since action creators are to be preconfigured with dependencies we don't need separate dispatch function passed here
}

export function todoListComponent(openComponent, actions: ActionCreators) {
    return openComponent('div', {}, {}, (el, elVoid, text) => { // there must be a root element but you decide what tag it is, openComponent will apply it's own attribute on it to monitor if it's new or not

        // this part renders internals of
        el('span', () => {
            text('foobar');
        });

        el('span', () => {
            text('lorem');
        });

        el('button', {
            onclick: () => {
                actions.updateList();
            }
        });

        // TODO we need access to preconfigured action creators
    }, (onCreated: Function, onUpdated: Function) => {
        onCreated((state) => { // state is internal component's state
            // this would be executed once for fresh render
        });

        onUpdated((state) => { // state is internal component's state
            // this would be executed if component existed before
        });
    });
}

// remaining question - how are we going to configure it?
// in our bootstrap we will have to have a master container of all actions

// if action creators would look smth like this
class TodoListActionCreators {
    constructor(
        private dispatch: Function, // injected
        private repository: TodoRepository // injected
    ) {}

    public updateTodoList(): PromiseLike {
        this.dispatch({/* smth synchronous here */});
        return this.repository.doSomeRequest().then(
            (data) => this.dispatch({/* smth synchronous here */}),
            (err) => this.dispatch({/* smth synchronous here */})
        );
    }
}

// then we need to define our actions like this
const actions = {
    updateList: new TodoListActionCreators(dispatch, todoRepository)
};

// or

const actions2 = {
    updateList: new TodoListActionCreators(inject(Dispatch), inject(TodoRepository))
};

// or

let c = container;
const actions3 = {
    updateList: c['action_creator.todo_list']
};

// or even
let c = name => container['action_creator.' + name];
const actions4 = {
    updateList: c('todo_list')
};

//

// we might need some IoC, like bottle.
// I looked at Inversify but it might not work well for this project since it's gonna be more functional than object-oriented
