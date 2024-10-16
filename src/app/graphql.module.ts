import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context'

// const uri = 'http://localhost:4500/graphql'; // <-- add the URL of the GraphQL server here
// const uri = 'http://192.168.29.74:3000/graphql'; //Desktop
// const uri = 'http://84.247.151.137:8005/graphql' // server url
const uri = 'https://api.myvidhik.com'; //ssl server 

export function imageUrl(): string {
  return uri.replace('/graphql', '');
}

export function getBaseUrl(): string {
  return uri;
}

export function createApollo(httpLink: HttpLink, url: string = ""): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => {
    const token = sessionStorage.getItem('vidhikToken');

    if (token == null) {
      return { headers: { Authorization: '' } };
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  return {
    // link: httpLink.create({ uri }),
    link: link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
