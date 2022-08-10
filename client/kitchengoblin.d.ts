interface cook {
    image: string?;
    ingredients: [{
        ingredientName: string;
        quantity: string;
    }];
    steps: [{
        text: string;
        image: string?;
    }];
}

interface imageUpload {
    properties: {};
    options: {
        size: string?;
        max: number?;
        maxWidth: number?;
        maxHeight: number?;
    };
    callback: (any) => void;
}